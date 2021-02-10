import React from 'react';
import CloseIcon from "@material-ui/icons/Close";
import {useDispatch , useSelector} from "react-redux" ;
import { closeclassCode , selectClassCode } from "../features/classCodeSlice";

import "../css/ClassCode.css";
function ClassCode() {
    var code = useSelector(selectClassCode) ;
    const dispatch = useDispatch();
    return (
        <div className="classCode" >
            <div className="classCode__header">
                <p>Class Code</p>
                {<CloseIcon onClick={() => dispatch(closeclassCode())} />}
            </div>
            <div className="classCode__code">{code.code}</div>
        </div>
    )
}

export default ClassCode
