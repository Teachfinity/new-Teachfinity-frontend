import React, { useEffect, useState } from 'react';
import "../css/MyClasses.css";
import CreateClassCard from "./CreateClassCard";
import createClassIcon from "../images/createclass.png";
import { selectClassModalIsOpen } from "../features/createClassSlice";
import { useSelector, useDispatch } from "react-redux";
import CreateClassForm from "./CreateClassForm";
import joinClassIcon from "../images/joinclass.png";
import JoinClassCard from "./JoinClassCard";
import ClassCard from './ClassCard';
import ClassEnrolledCard from './ClassEnrolledCard';
import { selectMyClassList, addClass , clearClass } from "../features/myClassListSlice";
import { selectClassesEnrolledList, addclassesEnrolled , clearclassesEnrolled } from "../features/classesEnrolledSlice";
import { openclassCode, selectclassCodeIsOpen } from "../features/classCodeSlice";
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { StarBorder, Star, MoreVert } from '@material-ui/icons';
import { selectUser } from "../features/userSlice";
import ClassCode from './ClassCode';
import axios from "axios";

function MyClasses() {
    const isCodeModalOpen = useSelector(selectclassCodeIsOpen);
    const dispatch = useDispatch();
    const isModalOpen = useSelector(selectClassModalIsOpen);
    const user = useSelector(selectUser);

    const classList = useSelector(selectMyClassList);
    const classenrolled = useSelector(selectClassesEnrolledList);
    const [cid, setCid] = useState([]);
    const [ceid, setCeid] = useState([]);
    const [isBusy, setBusy] = useState(true);
    /* Render the array of joined classes through the Mondo DB */
    useEffect(() => {
        dispatch(clearClass()) ;
        dispatch(clearclassesEnrolled()) ;
        axios.get("http://localhost:5000/users/getusers/" + user.uid)
            .then((res) => {
                setCid(res.data[0].classroomsOwned)
                setCeid(res.data[0].classroomsJoined)
                console.log(cid);
            }).then(() => {
                cid.map(item => {
                    axios.get("http://localhost:5000/classes/getclasses/" + item.cid)
                        .then((response) => {
                            dispatch(addClass({ name: response.data.name, description: response.data.description, id: response.data._id, code: response.data.code }));
                        })
                })
            }).then(() => {
                ceid.map(item => {
                    axios.get("http://localhost:5000/classes/getclasses/" + item.cid)
                        .then((response) => {
                            dispatch(addclassesEnrolled({ name: response.data.name, description: response.data.description, id: response.data._id, code: response.data.code }));
                        })
                })
            })
            .then(() => {
                console.log(classList.map((item) =>{
                    console.log(item)
                }))
                setBusy(false);
            })
            .catch(err => alert("Cid says" + err))
    }, [isBusy])
    return (

        <div className="myClasses" >
            <p>Create or Join a new Class</p>
            <div className="myClasses__createAndJoin">
                <CreateClassCard icon={createClassIcon} title="CreateClass" description="Create a new class using this option" />




                <JoinClassCard icon={joinClassIcon} title="Join Class" description="Join class by entering the code below" />




            </div>
            <div className="myClasses__ClassList">

                <p>Your Classes</p>
                {isBusy && classList.length===0 ?
                    <p class="myClasses__noclasses">No classes to Show</p>
                    :
                    <div className="classList__list">
                        {classList && classList.map((item) => (
                        
                            <ClassCard title={item.name} description={item.description} id={item.id} code={item.code} />

                        ))}
                    </div>
                }
            </div>
            <div className="myClasses__ClassList">
                <p>Classes Enrolled</p>
                {isBusy && classenrolled.length===0 ?
                    <p class="myClasses__noclasses">No classes to Show</p>
                    :
                    <div className="classList__list">
                        {classenrolled && classenrolled.map((item) => (
                            <ClassEnrolledCard title={item.name} description={item.description} id={item.id} code={item.code}/>
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
