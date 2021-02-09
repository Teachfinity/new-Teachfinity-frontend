import React, {useEffect} from 'react' ;
import './App.css';
import MainComponent from './components/MainComponent';
import UserManagement from "./components/UserManagement" ;
import {useDispatch, useSelector} from "react-redux" ;
import {selectUser , login, logout } from "./features/userSlice" ;
import db, {auth} from "./firebase" ;

function App() {
  
  const user = useSelector(selectUser) ;
  const dispatch = useDispatch() ;

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
     
      db.collection("users").doc(userAuth.uid).get().then(res => {
        const user = res.data() ;
        dispatch(login({
          uid: user.uid ,
          email: user.email,
          displayPic: user.displayPic ,
          displayName: user.displayName 
        })) ;
      }) ;
      }
      else{
        dispatch(logout())
      }
      
    });
    return unsubscribe ;
  } , [dispatch]) ;

  

  return (
    

    
    <div className="app">
      {!user ?
    <UserManagement /> :

    <MainComponent />
      }
    </div>
  );
}

export default App;
