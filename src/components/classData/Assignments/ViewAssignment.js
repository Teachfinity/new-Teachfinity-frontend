import React, {useEffect, useState} from 'react';
import {selectUser} from "../../../features/userSlice" ;
import { useSelector, useDispatch } from "react-redux";
import { selectedAssignment } from "../../../features/selectedAssignmentSlice";
import "../../../css/Assignment.css";
import axios from "axios" ;

function ViewAssignments() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser) ;
    const selectAssignment = useSelector(selectedAssignment) ;
    const [isBusy , setBusy] = useState(true) ;

    useEffect(() => {
        /* response for the assignments */
         axios.get("http://localhost:5000/assignments/getassignments/"+selectAssignment.aid)
        .then((res) => {
            console.log(res.data);
        })
        .then(()=>{
            setTimeout(() => {
                setBusy(false) ;
              }, 2000);
        })
        .catch(err => alert("MY FEED SAYs" + err))  
        
    } , [])
        
    
    return (
        <div>
            <p>Hi</p>
        </div>
    )
}

export default ViewAssignments
