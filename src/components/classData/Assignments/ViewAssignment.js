import React, {useEffect, useState} from 'react';
import {selectUser} from "../../../features/userSlice" ;
import { useSelector, useDispatch } from "react-redux";
import { selectedAssignment } from "../../../features/selectedAssignmentSlice";
import "../../../css/ViewAssignment.css";
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
        <div className="viewAssignment" >
          <div className="viewAssignment__info">
              <h1>Assignment 3</h1>
              <div>
                <p>Due at : 14-5-2021, 11:59PM</p>
                <h3>Total Marks: 30</h3>
              </div>
          </div>
          <div className="viewAssignment__instructions">
              <h2>Instructions</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos porro nobis nemo cumque quidem at, assumenda molestias est numquam cupiditate quam, autem rerum. Libero obcaecati reprehenderit ducimus provident voluptatibus officia?</p>
          </div>
          <div className="viewAssignment__file">
            <p>Assignment File Name</p>
          </div>
            <div className="viewAssignment__uploadFile">
                <form>
                    <input  id="file-upload" type="file" style={{ display: "none" }} />
                    <label htmlFor="file-upload">Upload File</label>
                    <p>uploaded File name</p>
                </form>

                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff4500" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M10 10l4 4m0 -4l-4 4" />
                    </svg>
                </button>
            </div>
            <button className="viewAssignment__submitAssignment" >
                Submit
            </button>
        

        </div>
    )
}

export default ViewAssignments
