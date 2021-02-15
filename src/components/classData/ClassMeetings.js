import React from 'react' ;
import "../../css/ClassMeetings.css" ;
import Meeting from "./Meeting" ; 
function ClassMeetings() {
    return (
        <div className="classMeetings" >
            <Meeting  meetingName="Lecture 1" startTime="10am" endTime="12pm" />
            
        </div>
    )
}

export default ClassMeetings
