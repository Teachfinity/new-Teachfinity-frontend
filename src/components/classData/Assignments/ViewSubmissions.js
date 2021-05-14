import React, {useEffect, useState} from 'react';
import "../../../css/viewSubmissions.css" ;
import {useSelector , useDispatch} from "react-redux" ;
import {selectedClass} from "../../../features/selectClassSlice" ;
import { selectedAssignment } from "../../../features/selectedAssignmentSlice";
import axios from "axios" ;

function ViewSubmissions() {

    const [isBusy , setBusy] = useState(true) ;
    const [sname , setSname] = useState([{user:"", file:"", fileUrl:"", submission:""}]) ;
    const [pending , setPending] = useState([]) ;
    const dispatch = useDispatch();
    const selectClass = useSelector(selectedClass) ;
    const selectAssignment = useSelector(selectedAssignment) ;

    useEffect(() => {
        /* response for the assignments */
        setSname([])
        setPending([])
        axios.get("http://localhost:5000/classes/getstudents/class/"+selectClass.id)
        .then((res)=>{
             res.data.map((id)=>{
                 console.log(id.sid)
                var userid = id.sid._id
                var username = id.sid.name
                axios.get("http://localhost:5000/assignments/getassignments/"+selectAssignment.aid)
                .then((res)=>{
                    if(res.data[0].studentfiles[0].sid===userid){
                        setSname(sname=> [...sname, {user: username, file: res.data[0].studentfiles[0].fileNme, 
                        fileUrl: res.data[0].studentfiles[0].fileUrl, submission: res.data[0].studentfiles[0].submittedAt}])
                        console.log("here")
                    }
                    else{
                        setPending(pending => [...pending, username])
                    }
                })
                .catch(err => alert("MY FEED SAYs" + err))  
            }) 
        })
        .catch(err => alert("MY FEED SAYs" + err))  
        .then(()=>{
            setTimeout(() => {
                setBusy(false) ;
              }, 2000);
        })
        .catch(err => alert("MY FEED SAYs" + err))  
        
    } , [])

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
                <ol>
                {sname.map((item, index)=>(
                    <li>{item.name}</li>
                ))}
                </ol>
            </div>
            <div className="viewSubmission__notSubmitted">
                <h1>
                    Pending submissions
                </h1>
                    {/* Map the name in this list */}
                    <ol>
                    {pending.map((item, index)=>(
                        <li>{item}</li>
                    ))}
                    </ol>
            </div>
            <div className="viewAssignment__actionButtons" >
                <button className="viewAssignment__downloadButton" >Download All</button>
                <button className="viewAssignment__downloadPlagiarism">Download Plagiarism Report</button>
            </div>
        </div>
    )
}

export default ViewSubmissions
