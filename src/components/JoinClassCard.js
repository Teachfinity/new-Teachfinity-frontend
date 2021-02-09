import React from 'react'
import "../css/JoinClassCard.css" ;
function JoinClassCard({icon , title , description}) {
    return (
        <div className="joinClass">
            <img src={icon} alt="" />
            <div className="joinClass__title">
                <p>{title}</p>
            </div>
            <div className="joinClass__description">
                <p>{description}</p>
            </div>
            <input placeholder="Enter code here..." />
            <button onClick={() => { }}>Join Class</button>

        </div>
    )
}

export default JoinClassCard
