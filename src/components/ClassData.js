import React from 'react' ;
import "../css/ClassData.css" ;
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import ClassSidebar from './classData/ClassSidebar';
import ClassFeed from './classData/ClassFeed';
import ClassMeetings from './classData/ClassMeetings';
import ClassCabinet from "./classData/ClassCabinet" ;
import GradesScreen from "./classData/Grades/GradesScreen" ;

function ClassData() {
    return (
        <Router>
            <div className="classData">
                <div className="classData__sidebar">
                    <ClassSidebar />
                </div>
                <div className="classData__contentScreen">
                <Switch>
                        <Route exact path="/classData/classFeed" >
                            <ClassFeed />
                        </Route>
                        <Route exact path="/classData/meetings" >
                            <ClassMeetings />
                        </Route>
                        <Route exact path="/classData/classCabinet" >
                            <ClassCabinet />
                        </Route>
                        <Route exact path="/classData/myGrades" >
                            <GradesScreen />
                        </Route>
                       
                        <Redirect to="/classData/classFeed" />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default ClassData
