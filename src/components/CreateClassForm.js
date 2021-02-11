import React from 'react' ;
import CloseIcon from "@material-ui/icons/Close" ;
import {closeModal} from "../features/createClassSlice" ;
import {useForm} from "react-hook-form" ;
import {useSelector , useDispatch} from "react-redux" ;
import {openclassCode, selectclassCodeIsOpen , changeClassCode , selectClassCode} from "../features/classCodeSlice" ;
import {addClass} from "../features/myClassListSlice" ;
import {selectUser} from "../features/userSlice" ;
import axios from "axios" ;
import "../css/CreateClassForm.css" ;

function CreateClassForm() {
    const dispatch = useDispatch() ;
    const user = useSelector(selectUser) ;

    const {register, handleSubmit , errors} = useForm() ;
    var currentUser = null ;  
    
    const onSubmit = formData => {
        var code = Math.random().toString(36).substr(2, 6);
        dispatch(changeClassCode({code: code})) ;
        axios.get("http://localhost:5000/users/getusers/"+user.uid)
        .then((res) => {
            currentUser = res.data[0]._id
        })
        .then(() => {
            const addClass = {
                "name" : formData.classTitle ,
                "description" : formData.description,
                "code" :  code,
                "teacher": currentUser
            }
            axios.post("http://localhost:5000/classes/addclass" , addClass)
            .then((res) => {
                axios.put("http://localhost:5000/users/updateuser/"+user.uid+"/classroomsOwned/"+res.data._id)
                .then(() =>{
                    alert("Class Created Successfully");
                }).catch(err => alert("Put -> " + err))
               
            })
            .catch(err => alert(err))  
        })
        .catch(err => alert(err)) ;

        
       
          
        
        /* dispatch(addClass({
            className: formData.classTitle , 
            classDescription: formData.description })) */

            

            /* Post the class data into the database */
           
                


            

            
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
                <button onClick={()=> {dispatch(openclassCode())}}   type="submit"  >Create</button>

            </form>
        </div>
        </div>
        
    )
}


export default CreateClassForm
