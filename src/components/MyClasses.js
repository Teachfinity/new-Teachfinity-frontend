import React from 'react';
import "../css/MyClasses.css";
import CreateClassCard from "./CreateClassCard";
import createClassIcon from "../images/createclass.png";
import {selectClassModalIsOpen} from "../features/createClassSlice" ;
import {selectAvatarMenuIsOpen} from "../features/avatarMenuSlice" ;
import {useSelector} from "react-redux" ;
import CreateClassForm from "./CreateClassForm" ;
import joinClassIcon from "../images/joinclass.png" ;
import JoinClassCard from "./JoinClassCard" ;
import AvatarMenu from './AvatarMenu';
function MyClasses() {

    const isModalOpen  = useSelector(selectClassModalIsOpen) ;
    const isAvatarMenuOpen = useSelector(selectAvatarMenuIsOpen) ;
    return (
        <div className="myClasses" >
            <p>Create or Join a new Class</p>
            <div className="myClasses__createAndJoin">
                 <CreateClassCard icon={createClassIcon} title="CreateClass" description="Create a new class using this option" />
 
                


                <JoinClassCard icon={joinClassIcon} title="Join Class" description="Join class by entering the code below" />




            </div>
            <div className="myClasses__ClassList">

            </div>
            {isModalOpen && <CreateClassForm/>}
            
        </div>
    )
}

export default MyClasses
