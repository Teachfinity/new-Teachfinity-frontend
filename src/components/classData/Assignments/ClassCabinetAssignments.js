import React, {useEffect, useState, useRef} from 'react'
import {useSelector , useDispatch} from "react-redux" ;
import {useForm} from "react-hook-form" ;
import "../../../css/ClassCabinetAssignments.css"
import {selectedClass} from "../../../features/selectClassSlice" ;
import {newAssignment, addAssignment, selectMyAssignmentList, clearAssignment, selectnewAssignment} from "../../../features/createAssignmentSlice";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';
import axios from "axios" ;
import AssignmentCard from './AssignmentCard';
import db, { auth, storageRef } from "../../../firebase";
function ClassCabinetAssignments() {
    const dispatch = useDispatch() ;
    const title = useRef("");
    const instructions = useRef("");
    const duetime = useRef("");
    const file = useRef("");
    const marks = useRef("");
    const [getdisplay , setDisplay] = useState(false) ;
    const [isBusy , setBusy] = useState(true) ;
    const selectClass = useSelector(selectedClass) ;
    const isNewAssignment = useSelector(selectnewAssignment) ;
    const assignmentList = useSelector(selectMyAssignmentList) ;
    const [date, Setdate] = useState();
    const [filename, setFilename] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    
    const fileHandler = async e => {
        const file = e.target.files[0];
        if (file) {
            console.log(file) ;
            setFilename(file.name);
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            setFileUrl(await fileRef.getDownloadURL());
            setTimeout(() => {
                console.log(fileUrl)
            } ,2000)
           
        }
        else {
            setFilename("");
        }
    }

    const handleNewAssignmentButton = () => {
        setDisplay(true) ;
    }
    const handleCancelButton = (e) => {
        e.preventDefault() ;
        setDisplay(false) ;
    }
    const handleDateChange = (date) => {
        Setdate(date)
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addAssignment({title: title.current.value, instructions: instructions.current.value, dueTime: duetime.current.value,
            fileName : filename, filePath: fileUrl, totalMarks: marks.current.value}));
        const addassignment = {
            "title" : title.current.value,
            "instructions" : instructions.current.value,
            "dueTime" : date,
            "fileName" : filename,
            "filePath": fileUrl,
            "totalMarks": marks.current.value,
        }
             axios.post("http://localhost:5000/assignments/newassignment", addassignment)
            .then((res) => {
                const assignmentid = res.data._id
                axios.put("http://localhost:5000/classes/updateclass/"+selectClass.id+"/assignment/"+res.data._id)
                .then((res) =>{
                    console.log(res.data)
                    dispatch(newAssignment())
                    setDisplay(false) ;
                }).catch(err => alert("Put -> " + err))
                .then(()=>{
                    axios.get("http://localhost:5000/classes/getstudents/class/"+selectClass.id)
                    .then((res)=>{
                        res.data.map((id)=>{
                            console.log(id.sid._id)
                            axios.put("http://localhost:5000/users/updateuser/"+id.sid._id+"/assignment/"+assignmentid)
                        })
                    })
                }) 
            })
            .catch(err => alert(err))  
    }
    useEffect(() => {
        dispatch(clearAssignment()) ;
        /* response for the assignments */
        axios.get("http://localhost:5000/classes/getassignments/class/"+selectClass.id)
        .then((res) => {
            /* Array in response */
            console.log(res.data);
            dispatch(addAssignment(res.data)) ;
        })
        .then(()=>{
            setTimeout(() => {
                setBusy(false) ;
              }, 2000);
        })
        .catch(err => alert("MY FEED SAYs" + err))
    } , [isNewAssignment])

    return (
        <div class="cabinetAssignments" >
            <div className="cabinetAssignments__newAssignmentButton">
                <button onClick={handleNewAssignmentButton} >
                    Post New Assignment
                </button>

                <div className="cabinetAssignments__assignmentForm" style={{display: getdisplay ? 'block' : 'none' }}  >
                    <form className="assignmentForm">
                        <div className="assignmentFormTitle" >
                            <label>Title:</label>
                            <input name="title" type="text" placeholder="Add title here" ref={title}/>
                        </div>
                        <div className="assignmentFormInstructions" >
                            <label>Instructions:</label>
                            <textarea name="instructions" type="text" cols="40" rows="6" placeholder="Instructions" ref={instructions}></textarea>
                        </div>
                        <div className="assignmentFormTime" >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            value={date}
                            label="Select Due Date/Time"
                            onChange={handleDateChange}
                            minDate={new Date("2021-01-01T00:00")}
                            format="dd/MM/yyyy hh:mm a"
                        />
                        </MuiPickersUtilsProvider>
                        </div>
                        <div className="assignmentFormFile" >
                            <label>Add File:</label>
                            <input type="file" onChange={fileHandler} />
                            <p>{filename}</p>
                        </div>
                        <div className="assignmentFormMarks" >
                            <label>Total Marks:</label>
                            <input type="number" min="0" ref={marks}/>
                        </div>
                        <div className="assignmentFormButtons" >
                            <button type="submit" onClick={handleSubmit} className="assignmentFormButton1">Post Assignment</button>
                            <button className="assignmentFormButton2" onClick={handleCancelButton} >Cancel</button>
                        </div>

                        
                    </form>

                </div>
            </div>
          
            <div className="cabinetAssignments__assignmentsList">
            {assignmentList.length === 0 ?  <p class="classFeed__noclasses">No Announcements</p>
                :
            
                assignmentList && assignmentList[0].map(({_id, aid}) => (
                <AssignmentCard id={_id} aid={aid._id} title={aid.title} />
                ))}
            </div>
        </div>
    )
}

export default ClassCabinetAssignments
