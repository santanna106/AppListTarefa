import React from 'react';
import {View,Text,StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

export default function TaskList({data,deleteItem,editItem}) {
 return (
   <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=>deleteItem(data.key)} >
            <Icon name="trash" color='#FFF' size={20} />

        </TouchableOpacity>
        <View style={styles.areaTexto} >
            <TouchableWithoutFeedback onPress={() => editItem(data)}>
                <Text style={styles.texto}>{data.nome}</Text>
            </TouchableWithoutFeedback>
        </View>
   </View>
 );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#121212',
        alignItems:'center',
        padding:10,
        marginBottom:10,
        borderRadius:5


    },
    button:{
        marginRight:10
    },
    areaTexto:{
        paddingRight:15
    },
    texto:{
        color:'#FFF',
        paddingRight:10
    }
})