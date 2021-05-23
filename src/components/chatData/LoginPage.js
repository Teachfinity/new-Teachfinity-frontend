import React, {useState, useEffect } from 'react'
import event from  '../../events' ;
import { Icon, Form, Message } from 'semantic-ui-react';
import "../../css/Chat.css" ;
import {useSelector} from "react-redux" ;
import {selectUser} from "../../features/userSlice" ;

function LoginPage({setUser , socket , user}){

  const sockett = socket ;
  const currentUser = useSelector(selectUser) ;
  const  [nickname, setNickname] =  useState(currentUser.displayName) ;
  const [error , setError]= useState('') ;
   
  
  
  
  
   const isvalid = ( nick ) => nick

   const setUserr = ({ user, isUser }) =>  {
    
    if( isUser ) {
      setError('This nickname already taken')
    } else {
      setError('')
      setUser( user )
    }
  }

  const handleChange = e => {
    setNickname(e.target.value) ; 
  }

  
  const handleSubmit = () => {
    
    let nick = nickname
    console.log(sockett) ;
    isvalid(nick) ?   sockett.emit( event.IS_USER, nickname, setUserr ) :
    setError('Please input your nickname') ;
    

  }

   useEffect(()=> {
    setTimeout(() => {
      let nick = nickname
      console.log(sockett) ;
      isvalid(nick) ?   sockett.emit( event.IS_USER, nickname, setUserr ) :
      setError('Please input your nickname') ;
      localStorage.setItem("user" , "Zaibi") ;

    }  , 1000)

  }, []) 



 
    return (
     
       <div className="chat__login" >
         <div className="chat__loginHeader">
         <h2>Loading...</h2>
         {/* <p>You need to enter a nickname to continue with chats</p> */}
           </div>
         <div className="chat__loginForm">
         
       {/*    <Form size='small' onSubmit={handleSubmit}>
            <Form.Input 
              className=""
              name='nickname'
              type='text'
              placeholder='Your nickname !'
              onChange={handleChange}
              autoFocus
              icon={<Icon name='add user' link circular inverted onClick={handleSubmit} />}
            />
            { error && (
              <Message negative>{ error }</Message>
            )}
          </Form>  */}
         {/*  <button onClick={handleSubmit} >Continue</button> */}
         </div>
         <img className="chat__loginImg" src="https://eyeonindie.com/wp-content/uploads/2020/08/ClutteredPlayfulAnteater-size_restricted.gif" />
       
            
             
        
       </div>
        
   
    )
  
}

export default LoginPage
