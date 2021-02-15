import React from 'react' ;
import "../../css/ClassSidebar.css" ;
import classDataLogo from "../../images/classDataLogo.png" ;
import {selectedClass} from "../../features/selectClassSlice" ;
import {useSelector} from "react-redux" ;
import {useHistory} from "react-router-dom" ;
function ClassSidebar() {
    const history = useHistory() ;
    const selectClass = useSelector(selectedClass) ;
    return (
        <div className="classSidebar" >
            <div className="classSidebar__classInfo">
            <img src={classDataLogo} alt="" />
            <h3>{selectClass.title}</h3>
            <p>{selectClass.description}</p>
            </div>

        <div className="classSidebar__nav">
            <button 
            onClick={() => history.push("/classData/classFeed")}>Announcements</button>
            <button
            onClick={() => history.push("/classData/meetings")} >Meetings</button>
            <button>Grades</button>
        </div>
            
        </div>
    )
}

export default ClassSidebar
