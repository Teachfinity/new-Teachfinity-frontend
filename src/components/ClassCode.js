import React, {useState} from 'react';
import CloseIcon from "@material-ui/icons/Close";
import {useDispatch , useSelector} from "react-redux" ;
import { closeclassCode , selectClassCode } from "../features/classCodeSlice";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "../css/ClassCode.css";
function ClassCode() {
    var code = useSelector(selectClassCode) ;
    const dispatch = useDispatch();
    const [copied, setCopied] = useState(false)

    const onCopy = () => {
        setCopied(true)
    }
    return (
        <div className="classCode" >
            <div className="classCode__header">
                <p>Class Code</p>
                {<CloseIcon onClick={() => dispatch(closeclassCode())} />}
            </div>
            <div className="classCode__code">
                {code.code}
                <CopyToClipboard text={code.code} onCopy={onCopy}>
                    <button>Copy Code</button>
                </CopyToClipboard>
            </div>
            <div>
                {copied ? <span class="code_copied">Code Copied!</span> : null}
            </div>
        </div>
    )
}

export default ClassCode
