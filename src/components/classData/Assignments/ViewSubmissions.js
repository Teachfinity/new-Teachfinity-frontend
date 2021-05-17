import React, {useEffect, useState} from 'react';
import "../../../css/viewSubmissions.css" ;
import {useSelector , useDispatch} from "react-redux" ;
import {selectedClass} from "../../../features/selectClassSlice" ;
import { selectedAssignment } from "../../../features/selectedAssignmentSlice";
import axios from "axios" ;

function ViewSubmissions() {

    const [isBusy , setBusy] = useState(true) ;
    const [sname , setSname] = useState([]) ;
    const [pending , setPending] = useState([]) ;
    const [files , setFiles] = useState([]) ;
    const dispatch = useDispatch();
    const selectClass = useSelector(selectedClass) ;
    const selectAssignment = useSelector(selectedAssignment) ;

    useEffect(() => {
        /* response for the assignments */
        setSname([])
        setPending([])
        axios.get("http://localhost:5000/classes/getstudents/class/"+selectClass.id)
        .then((res)=>{
            var ids = []
             res.data.map((id)=>{
                var userid = id.sid._id
                var username = id.sid.name
                axios.get("http://localhost:5000/assignments/getassignments/"+selectAssignment.aid)
                .then((res)=>{
                    res.data[0].studentfiles.map((id)=>{
                    if(ids.includes(id.sid)||ids.includes(userid)){
                        //do nothing
                    }
                    else{
                        if(id.sid===userid){
                        setSname(sname=> [...sname, {user: username, file: id.fileNme, 
                        fileUrl: id.fileUrl, submission: id.submittedAt}])
                        //setFiles
                        ids.push(userid)
                        }
                        else{
                        setPending(pending => [...pending, {uid: userid, user: username}])
                        ids.push(userid)
                        } 
                    }   
                })
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
                {/* Put this part in the mapping list of submitted assignments */}
                {sname.map((item)=>(
                <div className="viewSubmissions__submittedLI">
                    <div className="viewSubmissions__submittedLITop" >
                        <h2>{item.user}</h2>
                        <div>
                            <h4>Submitted At:</h4>
                            <p>{item.submission}</p>
                        </div>
                    </div>
                    <div className="viewSubmissions__submittedLIBottom" >
                        <h3>Submission File:   </h3>
                        <a className="anchortag" href={item.fileUrl} target="_blank" ><p> {item.file}</p></a>
                    </div>
                </div>
               ))}
                
                
            </div>
            <div className="viewSubmission__notSubmitted">
                <h1>
                    Pending submissions
                </h1>
                    {/* Map the name in this list */}
                    {
                        pending.length > 0
                    ?
                    <ol>
                    {pending.map((item, index)=>(
                        <li>{item.user}</li>
                    ))}
                    </ol>
                    :
                        <h3>No pending submmissions</h3>
}
            </div>
            <div className="viewAssignment__actionButtons" >
                <button className="viewAssignment__downloadButton" >Download All</button>
                <a href="http://localhost:80/hello/Mahnoor" target="_blank" style={{textDecoration:"none"}}>
                    <button className="viewAssignment__downloadPlagiarism">Download Plagiarism Report</button>
                </a>
            </div>
        </div>
    )
}

export default ViewSubmissions
