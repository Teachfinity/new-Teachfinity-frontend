import React from 'react' ;
import {useDispatch} from "react-redux" ;
import {openModal} from "../features/createClassSlice" ;
import "../css/CreateClassCard.css" ;

function CreateClassCard({icon , title, description}) {
    

    const dispatch = useDispatch() ;

    return (

           
        <div className="createClass" >
            <img src={icon} alt="" />
            <div className="createClass__title">
                <p>{title}</p>
            </div>
            <div className="createClass__description">
                <p>{description}</p>
                </div>
            <button onClick={() => {dispatch(openModal())}}>Create New Class</button>
            
        </div>

        

        
    )
}

export default CreateClassCard
