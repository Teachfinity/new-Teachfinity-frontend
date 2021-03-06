import React, { useRef, useState } from 'react'
import '../../css/ClassCabinetMaterial.css';
import db, { auth, storageRef } from "../../firebase";
import ClassCabinetMaterialFile from "./ClassCabinetMaterialFile";
import CancelIcon from '@material-ui/icons/Cancel';
function ClassCabinetMaterial() {
    const [filename, setFilename] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [submitFileName, setSubmitFileName] = useState("")

    const fileHandler = async e => {
        const file = e.target.files[0];
        if (file) {
            setFilename(file.name);
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            setFileUrl(await fileRef.getDownloadURL());
           
        }
        else {
            setFilename("");
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        setSubmitFileName(filename);
    }

    return (
        <div className="classCabinetMaterial">
            <div className="classCabinetMaterial__upload">
                <div className="classCabinetMaterial__uploadArea">
                    <form>
                        <input  onChange={fileHandler} id="file-upload" type="file" style={{ display: "none" }} />
                        <label htmlFor="file-upload">Upload File</label>
                        <p>{filename}</p>z
                    </form>
                </div>
                {
                    filename !== ""
                        ?
                        <div className="classCabinetMaterial__uploadButton">
                            <button onClick={handleSubmit} >Confirm upload</button>
                           <div className="classCabinetMaterial__cancelButton">
                                <CancelIcon onClick={()=> setFilename("")} />
                            </div> 
                        </div>
                        :
                        <></>
                }


            </div>
            <div className="classCabinetMaterial__files">
                {
                    submitFileName !== "" ?
                        <ClassCabinetMaterialFile fileName={submitFileName} link={fileUrl} />
                        :
                        <></>

                }
            </div>

        </div>
    )
}

export default ClassCabinetMaterial
