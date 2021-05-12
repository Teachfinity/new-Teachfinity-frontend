import React, {useEffect, useState} from 'react';
import {selectUser} from "../../../features/userSlice" ;
import { useSelector, useDispatch } from "react-redux";
import { selectedAssignment } from "../../../features/selectedAssignmentSlice";
import "../../../css/ViewAssignment.css";
import db, { auth, storageRef } from "../../../firebase";
import moment from 'moment'
import axios from "axios" ;

function ViewAssignments() {

    const dispatch = useDispatch();
    const [title , setTitle] = useState("") ;
    const [due , setDue] = useState() ;
    const [dueTime , setDueTime] = useState() ;
    const [marks , setMarks] = useState() ;
    const [instr , setInstr] = useState() ;
    const [fileName , setFileName] = useState() ;
    const [fileLink , setFileLink] = useState() ;
    const [studentFile , setStudentFile] = useState() ;
    const [fileUrl , setFileUrl] = useState() ;
    const user = useSelector(selectUser) ;
    const selectAssignment = useSelector(selectedAssignment) ;
    const [isBusy , setBusy] = useState(true) ;
    const [submitted , setSubmitted] = useState(false) ;
    const [submissionTime , setSubmissionTime] = useState() ;
    const [submittedfile , setSubmissionFile] = useState() ;
    const [submittedfileUrl , setSubmissionUrl] = useState() ;

    const fileHandler = async e => {
        const file = e.target.files[0];
        if (file) {
            console.log(file) ;
            setStudentFile(file.name);
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            setFileUrl(await fileRef.getDownloadURL());
            setTimeout(() => {
                console.log(fileUrl)
            } ,2000)
           
        }
        else {
            setStudentFile("");
        }
    }
    const removeFile = () =>{
        setStudentFile()
        setFileUrl()
    }
    const submitAssignment = () =>{
        var today = new Date().toLocaleString();
        var userid = null;
        const data = {
            "fileNme": studentFile,
            "fileUrl": fileUrl,
            "submittedAt": today,
        }
        console.log(data)
        axios.get("http://localhost:5000/users/getusers/"+user.uid)
        .then((res)=>{
            userid = res.data[0]._id
            axios.put("http://localhost:5000/assignments/updateassignment/"+selectAssignment.aid+"/student/"+userid+"/files",data)
            .then(()=>{
                setSubmitted(true)
            })
            .catch(err => alert("MY FEED SAYs" + err))  
        })
        .catch(err => alert("MY FEED SAYs" + err))  
    }

    useEffect(() => {
        /* response for the assignments */
        var useri = null;
        axios.get("http://localhost:5000/users/getusers/"+user.uid)
        .then((res)=>{
            useri = res.data[0]._id
        axios.get("http://localhost:5000/assignments/getassignments/"+selectAssignment.aid)
        .then((res) => {
            console.log(res.data[0]);
            setTitle(res.data[0].title)
            setDue(moment(res.data[0].dueTime).format('DD-MM-YYYY'))
            setDueTime(moment(res.data[0].dueTime).format('hh:mm A'))
            setMarks(res.data[0].totalMarks)
            setInstr(res.data[0].instructions)
            setFileName(res.data[0].fileName)
            setFileLink(res.data[0].filePath)
            res.data[0].studentfiles.map((id)=>{
                if(id.sid===useri){
                    setSubmitted(true)
                    setSubmissionTime(id.submittedAt);
                    setSubmissionFile(id.fileNme);
                    setSubmissionUrl(id.fileUrl);
                }
            })
        })
        .catch(err => alert("MY FEED SAYs" + err))  
        })
        .then(()=>{
            setTimeout(() => {
                setBusy(false) ;
              }, 2000);
        })
        .catch(err => alert("MY FEED SAYs" + err))  
        
    } , [])
        
    
    return (
        <div className="viewAssignment" >
          <div className="viewAssignment__info">
              <h1>{title}</h1>
              <div>
                    {submitted ?
                        <p>Submitted At: {submissionTime}</p>
                        :
                        <p>Due at : {due}, {dueTime}</p>
                    }
                <h3>Total Marks: {marks}</h3>
              </div>
          </div>
          <div className="viewAssignment__instructions">
              <h2>Instructions</h2>
              <p>{instr}</p>
          </div>
          <div className="viewAssignment__file">
            <a className="anchortag" href={fileLink} target="_blank" ><p>{fileName}</p></a>
          </div>
            <div className="viewAssignment__uploadFile">
                {submitted?
                    <div>
                    <h4>My Work</h4>
                    <a className="anchortag" href={submittedfileUrl} target="_blank"><p>{submittedfile}</p></a>
                    </div>
                    :
                    <form>
                    <input  id="file-upload" type="file" onChange={fileHandler} style={{ display: "none" }} />
                    <label htmlFor="file-upload">Upload File</label>
                    <p>{studentFile}</p>
                    </form>
                }

                {studentFile ? 
                <button onClick={removeFile}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff4500" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M10 10l4 4m0 -4l-4 4" />
                </svg>
                </button>
                :
                <p></p>
                }
                
            </div>
            {submitted ? 
                <p></p>
                :
                studentFile ?
                <button onClick={submitAssignment} className="viewAssignment__submitAssignment" >
                Submit
                </button>
                :
                <button disabled={true} className="viewAssignment__disabled" >
                Submit
                </button>
            
            }
        </div>
    )
}

export default ViewAssignments
