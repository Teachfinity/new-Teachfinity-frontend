import React, { useEffect, useState } from 'react'
import '../../css/ClassCabinetMaterial.css';
import db, { auth, storageRef } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import {selectedClass} from "../../features/selectClassSlice" ;
import ClassCabinetMaterialFile from "./ClassCabinetMaterialFile";
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios' ;
import { CommonLoading } from 'react-loadingg';
function ClassCabinetMaterial() {
    const selectClass = useSelector(selectedClass) ;
    const [filename, setFilename] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [submitFileName, setSubmitFileName] = useState("") ;
    const [classFiles, setClassFile] = useState([]) ;
    const [isLoading , setLoading] = useState(false)
    var filelink = ''

    const fileHandler = async e => {
        
        const file = e.target.files[0];
        if (file) {
            console.log(file) ;
            setFilename(file.name);
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            filelink = await fileRef.getDownloadURL()
            // console.log(await fileRef.getDownloadURL() ) ;
            setFileUrl(filelink)
            console.log(filelink)
            
           
        }
        else {
            setFilename("");
        }
    }
    const handleSubmit = e => {
        e.preventDefault();

        const addFile = {
            "filePath": fileUrl,
        }
        setSubmitFileName(filename);
        axios.put('http://localhost:5000/classes/updateclass/'+selectClass.id+'/file/'+filename, addFile)
        .then(()=>{
            setClassFile(classFile => [...classFile, {fileName: filename, filePath: fileUrl}])
            setFilename('')
            setFileUrl('')
        })
    }

    useEffect(()=>{
        setClassFile([]) ;
        axios.get('http://localhost:5000/classes/getclasses/'+selectClass.id)
        .then((res)=>{
            console.log(res.data)
            res.data.classFiles.map((item)=>{
                setClassFile(classFile => [...classFile, {fileName: item.fileName, filePath: item.filePath}])
            })
        })
    }, [])

    return (
        <div className="classCabinetMaterial">
            <div className="classCabinetMaterial__upload">
                <div className="classCabinetMaterial__uploadArea">
                    <form>
                        <input  onChange={fileHandler} id="file-upload" type="file" style={{ display: "none" }} />
                        <label htmlFor="file-upload">Upload File</label>
                        <p>{filename}</p>
                    </form>
                </div>
                {
                    fileUrl
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
                    classFiles.map((item)=>(
                        <ClassCabinetMaterialFile fileName={item.fileName} link={item.filePath} />

                    ))
                }
            </div>

        </div>
    )
}

export default ClassCabinetMaterial
