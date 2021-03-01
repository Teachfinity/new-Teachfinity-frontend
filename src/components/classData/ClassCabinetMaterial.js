import React , {useRef , useState} from 'react'
import '../../css/ClassCabinetMaterial.css' ;
import db , {auth , storageRef} from "../../firebase" ;
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
           
        </div>
    )
}

export default ClassCabinetMaterial
