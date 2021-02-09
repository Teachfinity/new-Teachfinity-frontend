import React from 'react'
import Header from "./Header" ;
import Sidebar from "./Sidebar" ;
import Chat from "./Chat" ;

import "../css/MainComponent.css" ;
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  
  import MyClasses from "./MyClasses" ;


function MainComponent() {
    return (
        <Router>
        <div className="mainComponent">
            <Header />

            <div className="mainComponent__body">
                <div className="mainComponent__sidebar">
                <Sidebar />
                </div>
               <div className="mainComponent__content">
              
                    <Switch>
                        <Route path="/myclasses" >
                            <MyClasses />
                        </Route>
                        <Route path="/chats" >
                            <Chat />
                        </Route>
                        <Redirect to="/myclasses" />
                    </Switch>

                    
                
               </div>
                
            </div>
          
        </div>
        </Router>
    )
}

export default MainComponent
