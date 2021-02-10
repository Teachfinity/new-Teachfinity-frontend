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
import ClassCard from './ClassCard';
import {selectMyClassList} from "../features/myClassListSlice" ;
import {openclassCode, selectclassCodeIsOpen} from "../features/classCodeSlice" ;
import ClassCode from'./ClassCode';
function MyClasses() {
    const isCodeModalOpen  = useSelector(selectclassCodeIsOpen) ;

    const isModalOpen  = useSelector(selectClassModalIsOpen) ;
    
    const classList = useSelector(selectMyClassList) ;
    return (
        <div className="myClasses" >
            <p>Create or Join a new Class</p>
            <div className="myClasses__createAndJoin">
                 <CreateClassCard icon={createClassIcon} title="CreateClass" description="Create a new class using this option" />
 
                


                <JoinClassCard icon={joinClassIcon} title="Join Class" description="Join class by entering the code below" />




            </div>
            <div className="myClasses__ClassList">

                <p>Your Classes</p>
                {classList.length === 0 ? 
                    <p class="myClasses__noclasses">No Classes to show</p>
                    :

                    <div className="classList__list">
                       {classList.map( ({className, classDescription} , index) => (
                        <ClassCard key={index} title={className} description={classDescription} />
                    ))}
                    </div>
                }
            </div>
            {isModalOpen && <CreateClassForm/>}
        
        {isCodeModalOpen && <ClassCode/>}
            
        </div>
    )
}

export default MyClasses
