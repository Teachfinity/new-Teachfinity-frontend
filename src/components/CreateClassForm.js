import React from 'react' ;
import CloseIcon from "@material-ui/icons/Close" ;
import {closeModal} from "../features/createClassSlice" ;
import {useForm} from "react-hook-form" ;
import {useSelector , useDispatch} from "react-redux" ;
import {openclassCode, selectclassCodeIsOpen , changeClassCode , selectClassCode} from "../features/classCodeSlice" ;
import {addClass} from "../features/myClassListSlice" ;
import axios from "axios" ;
import "../css/CreateClassForm.css" ;

function CreateClassForm() {
    const dispatch = useDispatch() ;
    const classCode = useSelector(selectClassCode) ;
    const {register, handleSubmit , errors} = useForm() ;
    
    
    const onSubmit = formData => {
        var code = Math.random().toString(36).substr(2, 6);
        dispatch(changeClassCode({code: code})) ;
        
       
        
        /* dispatch(addClass({
            className: formData.classTitle , 
            classDescription: formData.description })) */


            /* Post the class data into the database */
           
               /*  const addClass = {
                    "name" : formData.classTitle ,
                    "description" : formData.description,
                    "code" :  classCode.code
                }
                axios.post("http://localhost:5000/classes/addclass" , newClass)} */


            

            
        dispatch(closeModal()) ;
    
    }
    return (
        
       <div>
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
                <button /*onClick={()=> {dispatch(openclassCode())}} */ type="submit"  >Create</button>

            </form>
        </div>
        </div>
        
    )
}

export default CreateClassForm
