import React, {useEffect, useState} from 'react';
import "../../../css/viewSubmissions.css" ;
import {useSelector , useDispatch} from "react-redux" ;
import {selectedClass} from "../../../features/selectClassSlice" ;
import { selectedAssignment } from "../../../features/selectedAssignmentSlice";
import axios from "axios" ;
// import $ from 'jquery';

function ViewSubmissions() {

    const [isBusy , setBusy] = useState(true) ;
    const [sname , setSname] = useState([]) ;
    const [pending , setPending] = useState([]) ;
    const [files , setFiles] = useState([]) ;
    const [student, setStudent] = useState([]) ;
    const dispatch = useDispatch();
    const selectClass = useSelector(selectedClass) ;
    const selectAssignment = useSelector(selectedAssignment) ;
    const [modal , setModal] = useState(false) ;
    const [selectedname , setselectedname] = useState() ;
    const [storedText , setstoredText] = useState() ;
    const [matchedText , setmatchedText] = useState([]) ;
    useEffect(() => {
        /* response for the assignments */
        setSname([])
        setPending([])
        axios.get("http://localhost:5000/classes/getstudents/class/"+selectClass.id)
        .then((res)=>{
            var ids = []
             res.data.map((id)=>{
                console.log(id.sid.name)
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
                        files.push(id.fileUrl)
                        student.push(username)
                        ids.push(userid)
                        }
                    }   
                })
                if(!ids.includes(id.sid)&&!ids.includes(userid)){
                    setPending(pending => [...pending, {uid: userid, user: username}])
                    ids.push(userid)
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

    const openModal = (it) =>{
        setselectedname(it.user)
        fetch("http://localhost:80/PlagiarismCheck", {
            headers: {
                'Content-Type': 'application/json'
              },
              // Specify the method
              method: 'POST',
              // A JSON payload
              body: JSON.stringify(
                  {assignments: files,
                  studentNames: student}
              )
          }).then(function (response) { // At this point, Flask has printed our JSON  
            console.log('POST response: ');
            // console.log(response.text())
            return response.json();
          })
             .then(function (text) {
                 text.data[0].highlight.map((item,index)=>{
                     if(it.user===item.name){
                        setstoredText(item.string)
                     }
                 })
                 console.log(text.data[0].responses);
                text.data[0].responses.map((item,index)=>{
                     if(item[0]===it.user){
                        matchedText.push({student: item[1], match: item[2]})
                        // console.log(item[2])
                     }
                     console.log(matchedText);
                })
           }) 
            .then(function (){
                setModal(true)
            })
    }
    const sendURLs = () =>{
        console.log(student)
        fetch("http://localhost:80/example", {
            headers: {
                'Content-Type': 'application/json'
              },
              // Specify the method
              method: 'POST',
              // A JSON payload
              body: JSON.stringify(
                  {assignments: files,
                  studentNames: student}
              )
          }).then(function (response) { // At this point, Flask has printed our JSON  
            return response.text();
          }).then(function (text) {
            
              console.log('POST response: ');
          
              // Should be 'OK' if everything was successful
              console.log(text); 
              axios(
                {
                  url: "http://localhost:80/example", 
                  method: "GET",
                  responseType: "blob", // important
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              )
                .then((response) => {
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", "Results.csv"); //or any other extension
                  document.body.appendChild(link);
                  link.click();
                }) 
    })
}

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
                <div className="viewSubmissions__submittedLI" onClick={() => {openModal(item)}}>
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
                <button onClick={sendURLs} className="viewAssignment__downloadPlagiarism">Download Plagiarism Report</button>
            </div>

            {/* ViewSubissions Modal */}
            
            {modal 
            &&
            <div className="viewSubmissions__modal">
                <div>
                    <button onClick={() => {setModal(false); setmatchedText([])}}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <h2>{selectedname}</h2>
                <div>
                    <p className="orignal__text">{storedText}</p>
                    <ul>
                    {matchedText.map((text)=>(
                        <div>
                        <li className="matched__lists"><p><strong>{text.student}</strong></p><mark >{text.match}</mark></li>
                        </div>
                    ))}
                    </ul>
                </div>
            </div>
            }
        </div>
    )
}

export default ViewSubmissions
