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
import Assignments from './Assignments';

function StudentAssignments() {
    const dispatch = useDispatch() ;
    const [isBusy , setBusy] = useState(true) ;
    const selectClass = useSelector(selectedClass) ;
    const isNewAssignment = useSelector(selectnewAssignment) ;
    const assignmentList = useSelector(selectMyAssignmentList) ;

    useEffect(() => {
        dispatch(clearAssignment()) ;
        dispatch(newAssignment()) ;
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
        <div class="assignments" >
            <div className="assignmentsList">
            {assignmentList.length === 0 ?  <p class="classFeed__noclasses">No Assignments</p>
                :
                assignmentList && assignmentList[0].map(({_id, aid}) => (
                <Assignments id={_id} title={aid.title} instructions={aid.instructions} duetime={aid.dueTime}
                file={aid.filePath} marks={aid.totalMarks} />
                ))}
            </div>
        </div>
    )
}

export default StudentAssignments
