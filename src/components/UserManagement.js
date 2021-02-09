import React from 'react' ;
import Login from "./Login" ;
import Signup from "./Signup" ;
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

function UserManagement() {
    return (
        
            <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Redirect to="/login" />
        </Switch>
    </Router>
            
       
    )
}

export default UserManagement
