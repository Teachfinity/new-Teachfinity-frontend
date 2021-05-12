import React, {useEffect, useState} from 'react';
import "../../../css/viewSubmissions.css" ;
function ViewSubmissions() {
        
    
    return (
        <div className="viewSubmissions" >
            <div className="viewSubmissions__heading">
                <hr></hr>
                <h1>Assignment Details</h1>
                <hr></hr>
            </div>
            <div className="viewSubmissions__submitted">
                <h1>
                    Submissions
                </h1>
                {/*map student submission in a Component for showing shubmission */}
            </div>
            <div className="viewSubmission__notSubmitted">
                <h1>
                    Pending submissions
                </h1>
                <ol>
                    {/* Map the name in this list */}
                    <li>Muhammad Ali Zaib</li>
                    <li>Muhammad Ali Zaib</li>
                    <li>Muhammad Ali Zaib</li>
                    <li>Muhammad Ali Zaib</li>
                    <li>Muhammad Ali Zaib</li>
                    <li>Muhammad Ali Zaib</li>
                    <li>Muhammad Ali Zaib</li>
                </ol>
            </div>
            <div className="viewAssignment__actionButtons" >
                <button className="viewAssignment__downloadButton" >Download All</button>
                <button className="viewAssignment__downloadPlagiarism">Download Plagiarism report</button>
            </div>
        </div>
    )
}

export default ViewSubmissions
