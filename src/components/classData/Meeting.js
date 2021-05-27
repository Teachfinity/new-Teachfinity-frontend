import React from 'react';
import "../../css/Meeting.css";
import moment from 'moment'

function Meeting({ meetingName, startTime, endTime }) {
    const start = moment(startTime).format('hh:mm A ') ;
    const end = moment(endTime).format('hh:mm A ') ;
    const date = moment(startTime).format('DD-MM-YYYY');
    const getday = moment(startTime).weekday() ;
    var day ;
    switch(getday){
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        case 7:
            day = "Sunday";
            break;
            
    }
   
    return (
        <div className="meeting" >
            <div className="meeting__heading">
                <h2>New Meeting</h2>
            </div>
            <div className="meeting__details">
                <h2>
                    {meetingName}:
                </h2>
                
                <div className="meeting__timings">
                    <div>
                        <div className="meeting__time">
                            <p>From:</p>
                            <h4>{start}</h4>
                            <p>to</p>
                            <h4>{end}</h4>
                        </div>
                        <div className="meeting__date">
                            <p>Date:</p>
                            <h4>{date}</h4>
                            <h4>{day}</h4>
                        </div>
                    </div>
                    <div>
                        <a href="http://localhost:9001/demos/video-conferencing.html" target="_blank" className="MeetingStartButton">Start Class Session</a>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default Meeting
