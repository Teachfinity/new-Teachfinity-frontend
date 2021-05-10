import React from 'react' ;
import "../../css/ClassCabinet.css" ;
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  import ClassCabinetMaterial from "./ClassCabinetMaterial" ;
  import ClassCabinetNavigation from "./ClassCabinetNavigation" ;
  import ClassCabinetQuizzes from "./ClassCabinetQuizzes" ;
  import ClassCabinetAssignments from "./Assignments/ClassCabinetAssignments" ;
  import StudentAssignments from "./Assignments/StudentAssignments" ;
function ClassCabinet() {
    return (
        <Router>
            <div className="classCabinet" >
                <div className="classCabinet__navigation">
                    <ClassCabinetNavigation />
                </div>
                <div className="classCabinet__screens">
                    <Switch>
                        <Route exact path="/classData/classCabinet/classmaterial" >
                            <ClassCabinetMaterial />
                        </Route>
                        <Route exact path="/classData/classCabinet/myquizzes" >
                            <ClassCabinetQuizzes />
                        </Route>
                        <Route exact path="/classData/classCabinet/assignments" >
                            <ClassCabinetAssignments />
                        </Route>
                        <Route exact path="/classData/classCabinet/studentassignments" >
                            <StudentAssignments />
                        </Route>
                        <Redirect to="/classData/classCabinet/classmaterial" />
                    </Switch>
                </div>

            </div>
        </Router>
    )
}

export default ClassCabinet
