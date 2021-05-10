import React, {useState} from 'react'
import "../../../css/ClassCabinetAssignments.css"
function ClassCabinetAssignments() {
    const [getdisplay , setDisplay] = useState(false) ;

    const handleNewAssignmentButton = () => {
        setDisplay(true) ;
    }
    const handleCancelButton = (e) => {
        e.preventDefault() ;
        setDisplay(false) ;
    }

    return (
        <div class="cabinetAssignments" >
            <div className="cabinetAssignments__newAssignmentButton">
                <button onClick={handleNewAssignmentButton} >
                    Post New Assignment
                </button>

                <div className="cabinetAssignments__assignmentForm" style={{display: getdisplay ? 'block' : 'none' }}  >
                    <form action="" className="assignmentForm">
                        <div className="assignmentFormTitle" >
                            <label >Title:</label>
                            <input type="text" placeholder="Add title here" />
                        </div>
                        <div className="assignmentFormInstructions" >
                            <label>Instructions:</label>
                            <textarea name="" id="" cols="40" rows="6" placeholder="Instructions"></textarea>
                        </div>
                        <div className="assignmentFormDate" >
                            <label>Due date:</label>
                            <input type="date" />
                        </div>
                        <div className="assignmentFormTime" >
                            <label>Due Time:</label>
                            <input type="time" />
                        </div>
                        <div className="assignmentFormFile" >
                            <label>Add File:</label>
                            <input type="file" />
                        </div>
                        <div className="assignmentFormMarks" >
                            <label>Total Marks:</label>
                            <input type="number" min="0" />
                        </div>
                        <div className="assignmentFormButtons" >
                            <button className="assignmentFormButton1" >Post Assignment</button>
                            <button className="assignmentFormButton2" onClick={handleCancelButton} >Cancel</button>
                        </div>

                        
                    </form>

                </div>
            </div>
          
            <div className="cabinetAssignments__assignmentsList">
                <h1>No Assignmets to Show</h1>
            </div>
        </div>
    )
}

export default ClassCabinetAssignments
