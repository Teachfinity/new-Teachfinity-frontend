import React from 'react' ;
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import GradeAssignments from './GradeAssignments';
import GradeQuizzes from "./GradeQuizzes";
import GradeNavigation from "./GradeNavigation" ;
import "../../../css/GradesScreen.css"
function GradesScreen() {
    return (
        <Router>
            <div className="GradesScreen">
                <div className="GradesScreen__navigation">
                    <GradeNavigation />
                </div>
                <div className="GradeScreen__screens">
                    <Switch>
                        <Route exact path="/classData/myGrades/assignment" >
                            <GradeAssignments />
                        </Route>
                        <Route exact path="/classData/myGrades/quiz" >
                            <GradeQuizzes />
                        </Route>
                        <Redirect to="/classData/myGrades/assignment" />
                    </Switch>
                </div>

            </div>
        </Router>
    )
}

export default GradesScreen
