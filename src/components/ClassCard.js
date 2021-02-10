import React from 'react'
import "../css/ClassCard.css" ;

function ClassCard({title , description}) {
    return (
        <div className="classCard" onClick={() => alert("New Class")} >
            <div className="classCard__logo">
                <p>{title.charAt(0).toUpperCase() }</p>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            
        </div>
    )
}

export default ClassCard
