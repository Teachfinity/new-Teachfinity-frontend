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

function ClassData() {
    return (
        <Router>
            <div className="classData">
                <div className="classData__sidebar">
                    <ClassSidebar />
                </div>
                <div className="classData__contentScreen">
                <Switch>
                        <Route path="/classData/classFeed" >
                            <ClassFeed />
                        </Route>
                        <Route path="/classData/meetings" >
                            <ClassMeetings />
                        </Route>
                       
                        <Redirect to="/classData/classFeed" />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default ClassData
