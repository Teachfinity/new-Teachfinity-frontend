import React, {useEffect, useState} from 'react' ;
import {useSelector , useDispatch} from "react-redux" ;
import "../../css/ClassCabinetNavigation.css" ;
import { selectUser } from "../../features/userSlice";
import {selectedClass} from "../../features/selectClassSlice" ;
import {useHistory} from "react-router-dom" ;

import axios from "axios" ;
function ClassCabinetNavigation() {
    const history  = useHistory();
    const user = useSelector(selectUser);
    const selectClass = useSelector(selectedClass) ;
    const [isBusy , setBusy] = useState(true) ;
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:5000/users/getusers/"+user.uid)
        .then((res)=>{
            const userid = res.data[0]._id
            console.log(userid)
        axios.get("http://localhost:5000/classes/getclasses/"+selectClass.id)
        .then((resp) => {
            /* Array in response */
            if(resp.data.teacher===userid){
                setAdmin(true)
                console.log("true")
            }
        })
        .catch(err => alert("MY FEED SAYs" + err))
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
        <div className="classCabinetNavigation" >
            <button 
            onClick={() => history.push("/classData/classCabinet/classmaterial")}
            >Files</button>
            {admin ? 
            <button
             onClick={() => history.push("/classData/classCabinet/myquizzes")}>
                 Quizzes
            </button>
                :
                <button onClick={() => history.push("/classData/classCabinet/studentquiz")}>
                Quizzes
                </button>
            }
            {admin ? 
                <button onClick={() => history.push("/classData/classCabinet/assignments")}>
                Assignments
                </button>
                :
                <button onClick={() => history.push("/classData/classCabinet/studentassignments")}>
                Assignments
                </button>
            }
        </div>
    )
}

export default ClassCabinetNavigation
