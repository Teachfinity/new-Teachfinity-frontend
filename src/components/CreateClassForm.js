import React from 'react' ;
import CloseIcon from "@material-ui/icons/Close" ;
import {useDispatch} from "react-redux" ;
import {closeModal} from "../features/createClassSlice" ;
import {useForm} from "react-hook-form" ;

import {addClass} from "../features/myClassListSlice" ;
import "../css/CreateClassForm.css" ;
function CreateClassForm() {
    const dispatch = useDispatch() ;
    const {register, handleSubmit , errors} = useForm() ;
    const onSubmit = formData => {
        dispatch(addClass({
            className: formData.classTitle , 
            classDescription: formData.description }))
        dispatch(closeModal()) ;
    
    }
    return (
        
       
        <div className="createClassForm" >
            <div className="createClassForm__header">
                <p>Create New Class</p>
               { <CloseIcon onClick={() => dispatch(closeModal())} />}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Class Name </p>
                <input name="classTitle" placeholder="Enter the class name here"
                type="text" ref={register({required: true})}
                />
                {errors.classTitle && ( <p className="createClassForm__error">Class name is a required field</p> )}
                
                <p>Class Description </p>
                <textarea rows="8" name="description" placeholder="Enter the description here"
                type="text" ref={register({required:true})}
                />
                  {errors.description && ( <p className="createClassForm__error">Description is a required field</p> )}
                <button type="submit"  >Create</button>

            </form>
        </div>
        
        
    )
}

export default CreateClassForm
