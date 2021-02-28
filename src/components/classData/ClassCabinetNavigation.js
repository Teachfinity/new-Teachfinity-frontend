import React from 'react' ;
import "../../css/ClassCabinetNavigation.css" ;
import {useHistory} from "react-router-dom" ;

function ClassCabinetNavigation() {
    const history  = useHistory() ;
    return (
        <div className="classCabinetNavigation" >
            <button 
            onClick={() => history.push("/classData/classCabinet/classmaterial")}
            >Files</button>
            <button
             onClick={() => history.push("/classData/classCabinet/myquizzes")}
            >Quiz</button>
            <button>Assignments</button>
        </div>
    )
}

export default ClassCabinetNavigation
