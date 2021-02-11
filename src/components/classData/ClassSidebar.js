import React from 'react' ;
import "../../css/ClassSidebar.css" ;
import classDataLogo from "../../images/classDataLogo.png" ;
function ClassSidebar() {
    return (
        <div className="classSidebar" >
            <div className="classSidebar__classInfo">
            <img src={classDataLogo} alt="" />
            <h3>Class Title</h3>
            <p>description</p>
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
