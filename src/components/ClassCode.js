import React from 'react';
import CloseIcon from "@material-ui/icons/Close";
import {useDispatch} from "react-redux" ;
import { closeclassCode } from "../features/classCodeSlice";
import "../css/ClassCode.css";
function ClassCode() {
    var code = Math.random().toString(36).substr(2, 6);
    const dispatch = useDispatch();
    return (
        <div className="classCode" >
            <div className="classCode__header">
                <p>Class Code</p>
                {<CloseIcon onClick={() => dispatch(closeclassCode())} />}
            </div>
            <div className="classCode__code">{code}</div>
        </div>
    )
}

export default ClassCode
