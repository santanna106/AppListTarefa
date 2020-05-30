import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyDn6NdAJOlDa1NNd3fi5gYpL2DH5FTCja0",
    authDomain: "meuapp-880e7.firebaseapp.com",
    databaseURL: "https://meuapp-880e7.firebaseio.com",
    projectId: "meuapp-880e7",
    storageBucket: "meuapp-880e7.appspot.com",
    messagingSenderId: "452832160796",
    appId: "1:452832160796:web:8911482f30c8d38f0703d9",
    measurementId: "G-62NQKMPG80"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase
 