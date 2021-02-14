import React from 'react' ;
import "../../css/ClassSidebar.css" ;
import classDataLogo from "../../images/classDataLogo.png" ;
import {selectedClass} from "../../features/selectClassSlice" ;
import {useSelector} from "react-redux" ;
function ClassSidebar() {
    const selectClass = useSelector(selectedClass) ;
    return (
        <div className="classSidebar" >
            <div className="classSidebar__classInfo">
            <img src={classDataLogo} alt="" />
            <h3>{selectClass.title}</h3>
            <p>{selectClass.description}</p>
            </div>

        <div className="classSidebar__nav">
            <button>Announcements</button>
            <button>Meetings</button>
            <button>Grades</button>
        </div>
            
        </div>
    )
}

export default ClassSidebar
