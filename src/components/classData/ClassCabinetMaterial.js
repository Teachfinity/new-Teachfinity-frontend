import React , {useRef , useState} from 'react'
import '../../css/ClassCabinetMaterial.css' ;
import db , {auth , storageRef} from "../../firebase" ;
import ClassCabinetMaterialFile from "./ClassCabinetMaterialFile" ;
function ClassCabinetMaterial() {
    const [filename , setFilename] = useState("")
    
    const fileHandler = e => {
        const file  = e.target.files[0] ;
        if(file){

            setFilename(file.name) ;
        }
        else{
            setFilename("") ;
        }
    }

    return (
        <div className="classCabinetMaterial">
            <div className="classCabinetMaterial__upload">
                <div className="classCabinetMaterial__uploadArea">
                    <form>
                    <input onChange={fileHandler} id="file-upload" type="file" style={{ display: "none" }} />
                    <label htmlFor="file-upload">Upload File</label>
                    <p>{filename}</p>
                    </form>
                </div>
                {
                        filename !== ""
                            ?
                            <div className="classCabinetMaterial__uploadButton">
                                <button>Confirm upload</button>
                            </div>
                            :
                            <></>
                    }
                
                
            </div>
            <div className="classCabinetMaterial__files">
              <ClassCabinetMaterialFile fileName={"Midterm Exam.pdf"} link={"https://firebasestorage.googleapis.com/v0/b/teachfinity-project.appspot.com/o/classDataLogo.png?alt=media&token=610d085f-26bf-4cfe-b987-fa343e515132"}  />
            </div>
           
        </div>
    )
}

export default ClassCabinetMaterial
