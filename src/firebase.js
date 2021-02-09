import firebase from "firebase" ;
const firebaseConfig = {
    apiKey: "AIzaSyBmHKmlxh4QqxAdKVCWV3HTkKbafltkr0c",
    authDomain: "teachfinity-project.firebaseapp.com",
    projectId: "teachfinity-project",
    storageBucket: "teachfinity-project.appspot.com",
    messagingSenderId: "246270150373",
    appId: "1:246270150373:web:42c73ec6dd9079097e360c",
    measurementId: "G-GSF1XR897B"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig) ;

  const db = firebaseApp.firestore() ;

  const auth = firebase.auth() ;
  const provider = new firebase.auth.GoogleAuthProvider() ;

  export {auth , provider} ;
  
  export default db ;

