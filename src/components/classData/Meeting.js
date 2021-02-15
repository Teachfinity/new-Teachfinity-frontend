import React from 'react';
import "../../css/Meeting.css";
function Meeting({ meetingName, startTime, endTime }) {
    return (
        <div className="meeting" >
            <div className="meeting__heading">
                <h2>Mahnoor Saleem Announced a new Meeting</h2>
            </div>
            <div className="meeting__details">
                <h2>
                    {meetingName}:
                </h2>
                
                <div className="meeting__timings">
                    <div className="meeting__time">
                        <p>From:</p>
                        <h4>{startTime}</h4>
                        <p>-</p>
                        <h4>{endTime}</h4>
                    </div>
                    
                    <div className="meeting__date">
                    <p>Date:</p>
                    <h4>18-feb-2020 Thursday</h4>
                    </div>
                   
                </div>

            </div>

        </div>
    )
}

export default Meeting
