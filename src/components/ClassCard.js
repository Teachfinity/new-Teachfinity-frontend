import React from 'react'
import "../css/ClassCard.css" ;
import {useHistory} from "react-router-dom" ;

function ClassCard({title , description}) {
    const history = useHistory() ;
    return (
        <div className="classCard" onClick={() => history.push("/classData")} >
            <div className="classCard__logo">
                <p>{title.charAt(0).toUpperCase() }</p>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            
        </div>
    )
}

export default ClassCard
