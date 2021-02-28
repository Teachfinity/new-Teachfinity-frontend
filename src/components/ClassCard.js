import React from 'react'
import "../css/ClassCard.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addClass } from "../features/selectClassSlice";
import { StarBorder, Star, MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
function ClassCard({ title, description, id, code }) {
    const dispatch = useDispatch();
    const history = useHistory();
    /* Function That will dispatch data into redux */
    const openClass = () => {
        dispatch(addClass({ title, description, id, code }));
        history.push("/classData")
    }
    return (
        <div className="classCard" onClick={openClass} >
            <div className="classCard__logo">
                <p>{title.charAt(0).toUpperCase()}</p>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>

        </div>
    )
}

export default ClassCard
