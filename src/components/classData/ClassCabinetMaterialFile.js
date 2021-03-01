import React from 'react'
import "../../css/ClassCabinetMaterialFile.css" ;
function ClassCabinetMaterialFile({fileName , link}) {
    return (
        <a className="anchortag" href={link} target="_blank" >
            <div className="classCabinetMaterialFile" >
            {fileName}
        </div>
        </a>
       
        
    )
}

export default ClassCabinetMaterialFile
