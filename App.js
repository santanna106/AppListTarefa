import React,{useState,useEffect,useRef} from 'react';
import { View,Text,StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import firebase from './src/FireBaseConnection'
import TaskList from './src/TaskList'

console.disableYellowBox = true

export default function App() {
  const inputRef = useRef(null)
  const [newTask,setNewTask] = useState('')
  const [key,setKey] = useState('')
  const [tasks,setTasks] = useState([])

  useEffect(() => {

    async function loadTask(){
      await firebase.database().ref('tarefas').on('value',(snapshot) => {
        setTasks([])
        snapshot.forEach((chieldItem) => {
          let data = {
            key: chieldItem.key,
            nome: chieldItem.val().nome
          }

          setTasks(oldArray => [...oldArray,data])
        })
      })
    }

    loadTask()
   
  }, [])

  async function handleAdd() {
   if(newTask !== ''){

     if(key !== ''){
       await firebase.database().ref('tarefas').child(key).update({
         nome:newTask
       })
       Keyboard.dismiss()
       setNewTask('')
       setKey('')
       return

     } 

    let tarefas = await firebase.database().ref('tarefas')
    let chave = tarefas.push().key
    tarefas.child(chave).set({
       nome:newTask
    })
    

     Keyboard.dismiss()
     setNewTask('')
   }
 }

async function handleDelete(key){
  await firebase.database().ref('tarefas').child(key).remove()
}

async function handleEdit(data){
  
  setNewTask(data.nome)
  inputRef.current.focus()
  setKey(data.key)
}

function cancelEdit(){
  setKey('')
  setNewTask('')
}


 return (
   <View style={styles.container}>

     {key.length > 0 &&   ( 
     
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity>
            <Icon name="x-circle" size={20} color='#FF0000' onPress={cancelEdit} />
          </TouchableOpacity>
          <Text style={{marginLeft:5,marginBottom:8,color:'#FF0000'}}>Você está editando uma tarefa!</Text>
        </View>
      )
     }
     
     <View style={styles.containerTask}>
       <TextInput
        style={styles.input}
        placeholder="O que vai fazer hoje?"
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setNewTask(texto) }
        value={newTask}
        ref={inputRef}
       />
       <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
         <Text style={styles.buttonText}>+</Text>
       </TouchableOpacity>
     </View>

     <FlatList 
      data={tasks}
      keyExtractor ={item => item.key}
      renderItem={({ item }) => (
        <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
      )}
     />

   </View>
  );
}

const styles = StyleSheet.create({
  container :{
    flex:1,
    marginTop:25,
    marginLeft:10,
    marginLeft:10
  },
  containerTask:{
    flexDirection:'row'
  },
  input:{
    flex:1,
    marginBottom:10,
    padding:10,
    borderWidth:1,
    borderColor:'#121212',
    height:40,
    fontSize:17
  },
  buttonAdd: {
    justifyContent:'center',
    alignItems:'center',
    height:40,
    backgroundColor: '#121212',
    paddingLeft:14,
    paddingRight:14,
    marginLeft:5
  },
  buttonText:{
    fontSize:23,
    color:'#FFF'
  }


})