import React, { useEffect, useState } from 'react';
import "../css/MyClasses.css";
import CreateClassCard from "./CreateClassCard";
import createClassIcon from "../images/createclass.png";
import { selectClassModalIsOpen } from "../features/createClassSlice";
import { selectAvatarMenuIsOpen } from "../features/avatarMenuSlice";
import { useSelector, useDispatch } from "react-redux";
import CreateClassForm from "./CreateClassForm";
import joinClassIcon from "../images/joinclass.png";
import JoinClassCard from "./JoinClassCard";
import ClassCard from './ClassCard';
import { selectMyClassList, addClass } from "../features/myClassListSlice";
import { openclassCode, selectclassCodeIsOpen } from "../features/classCodeSlice";
import { selectUser } from "../features/userSlice";
import ClassCode from './ClassCode';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import ClassData from './ClassData';
import axios from "axios";

function MyClasses() {
    const isCodeModalOpen = useSelector(selectclassCodeIsOpen);
    const dispatch = useDispatch();
    const isModalOpen = useSelector(selectClassModalIsOpen);
    const user = useSelector(selectUser);

const classList = useSelector(selectMyClassList);
 const [cid , setCid] = useState([]) ; 
 const [name , setName] = useState([]) ; 
 const [des , setDes] = useState([]) ; 
 const [theArray, setTheArray] = useState([]);
    var classes = [1,2];
    /* Render the array of joined classes through the Mondo DB */
    useEffect(() => {
       /*  axios.get("http://localhost:5000/users/getusers/" + user.uid)
            .then((res) => {
               
              setCid(res.data[0].classroomsOwned)  
              
            }).then(() => {
                
                    axios.get("http://localhost:5000/classes/getclasses/"+cid[0].cid)
                    .then((res)=>{
                       console.log(res.data.name )
                    })
               
            })
            .catch(err => alert(err)) */

         /*    axios.get("http://jsonplaceholder.typicode.com/todos")
            .then((res) => {
                res.data.map(item => {
                  dispatch(addClass({name: item.title , description: item.completed})) ;
               console.log(item.title)
                }); 
              
             
            })
            .catch(err => alert(err)) */


    }, [])
    return (

        <div className="myClasses" >
            <p>Create or Join a new Class</p>
            <div className="myClasses__createAndJoin">
                <CreateClassCard icon={createClassIcon} title="CreateClass" description="Create a new class using this option" />




                <JoinClassCard icon={joinClassIcon} title="Join Class" description="Join class by entering the code below" />




            </div>
            <div className="myClasses__ClassList">

                <p>Your Classes</p>
                {classList.length===0 ?
                    <p class="myClasses__noclasses">No Classes to show</p>
                    :
                    <div className="classList__list">
                         {classList.map(({name , description} , index) => (
                             <ClassCard key={index}  title={name} description={description} />
                        ))}
                         
                        
                    </div>
                }
            </div>
            {isModalOpen && <CreateClassForm />}

            {isCodeModalOpen && <ClassCode />}

        </div>


    )
}

export default MyClasses
