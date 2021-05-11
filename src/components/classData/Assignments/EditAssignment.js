import React, {useState, useEffect, useRef} from 'react' ;
import DateFnsUtils from '@date-io/date-fns';
import "../../../css/ClassCabinetAssignments.css"
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';
import {useSelector , useDispatch} from "react-redux" ;
import {selectedClass} from "../../../features/selectClassSlice" ;
import axios from "axios" ;
import {newAssignment, addAssignment, selectMyAssignmentList, clearAssignment, selectnewAssignment} from "../../../features/createAssignmentSlice";


function EditAssignment(id) {
    const dispatch = useDispatch() ;
    const [title, setTitle] = useState();
    const [instr, setInstr] = useState();
    const [marks, setMarks] = useState();
    const [file, setFile] = useState();
    const [date, Setdate] = useState();
    const selectClass = useSelector(selectedClass) ;
    const [isBusy , setBusy] = useState(true) ;

    const handleCancelButton = (e) => {
        e.preventDefault() ;
    }
    const titlechange = (e) =>{
        setTitle(e.target.value)
    }
    const instructionschange = (e) =>{
        setInstr(e.target.value)
    }
    const markschange = (e) =>{
        setMarks(e.target.value)
    }
    const handleDateChange = (date) => {
        Setdate(date)
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addAssignment({title: title, instructions: instr, dueTime: date,
            filePath: file, totalMarks: marks}));
        axios.put("http://localhost:5000/assignments/updateassignment/"+id.id+"/title/"+title)
        .then(() =>{
            axios.put("http://localhost:5000/assignments/updateassignment/"+id.id+"/instr/"+instr)
            .then(()=>{
                axios.put("http://localhost:5000/assignments/updateassignment/"+id.id+"/due/"+date)
            })
            .then(()=>{
                axios.put("http://localhost:5000/assignments/updateassignment/"+id.id+"/marks/"+marks)
            })
            .then(()=>{
                
                dispatch(newAssignment())
            })
            .catch(err => alert(err));
            })
            .catch(err => alert(err));
            
    }
    
    useEffect(() => {
        /* response for the assignments */
        console.log(id)
        axios.get("http://localhost:5000/assignments/getassignments/"+id.id)
        .then((res) => {
            /* Array in response */
            console.log(res.data[0])
            setTitle(res.data[0].title)
            setInstr(res.data[0].instructions)
            setFile(res.data[0].filePath)
            setMarks(res.data[0].totalMarks)
        })
        .then(()=>{
            setTimeout(() => {
                setBusy(false) ;
              }, 2000);
        })
        } , [])

    return (
       <div>
           <form className="assignmentForm">
                        <div className="assignmentFormTitle" >
                            <label>Title:</label>
                            <input onChange={titlechange} name="title" type="text" defaultValue={title} placeholder="Add title here"/>
                        </div>
                        <div className="assignmentFormInstructions" >
                            <label>Instructions:</label>
                            <textarea  onChange={instructionschange}  defaultValue={instr} name="instructions" type="text" cols="40" rows="6" placeholder="Instructions" ></textarea>
                        </div>
                        <div className="assignmentFormTime" >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            defaultValue={date}
                            label="Select Due Date/Time"
                            onChange={handleDateChange}
                            minDate={new Date("2021-01-01T00:00")}
                            format="dd/MM/yyyy hh:mm a"
                        />
                        </MuiPickersUtilsProvider>
                        </div>
                        <div className="assignmentFormFile" >
                            <label>Add File:</label>
                            <input defaultValue={file} type="file" />
                        </div>
                        <div className="assignmentFormMarks" >
                            <label>Total Marks:</label>
                            <input  onChange={markschange}  defaultValue={marks} type="number" />
                        </div>
                        <div className="assignmentFormButtons" >
                            <button type="submit" onClick={handleSubmit} className="assignmentFormButton1">Edit Assignment</button>
                            <button className="assignmentFormButton2" onClick={handleCancelButton} >Cancel</button>
                        </div>

                        
                    </form>
        </div>
        
    )
}


export default EditAssignment
