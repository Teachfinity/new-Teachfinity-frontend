import React from 'react' ;
import CloseIcon from "@material-ui/icons/Close" ;
import {useDispatch} from "react-redux" ;
import {closeModal} from "../features/createClassSlice" ;
import "../css/CreateClassForm.css" ;
function CreateClassForm() {
    const dispatch = useDispatch() ;
    return (
        
       
        <div className="createClassForm" >
            <div className="createClassForm__header">
                <p>Create New Class</p>
               { <CloseIcon onClick={() => dispatch(closeModal())} />}
            </div>
            <form>
                <p>Class Name </p>
                <input />
                <p>Class Description </p>
                <textarea rows="8" />
                <button>Create</button>

            </form>
        </div>
        
        
    )
}

export default CreateClassForm
