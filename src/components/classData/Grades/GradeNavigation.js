import React  from 'react'
import "../../../css/GradeNavigation.css" ;
import {useHistory} from "react-router-dom" ;
function GradeNavigation() {
    const history = useHistory() ;
    return (
        <div className="GradeNavigation">
            <button onClick={() => history.push("/classData/myGrades/assignment")} >Assignments</button>
            <button onClick={()=> history.push("/classData/myGrades/quiz")} >Quiz</button>
        </div>
    )
}

export default GradeNavigation
