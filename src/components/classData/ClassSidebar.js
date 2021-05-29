import React, {useState} from 'react';
import "../../css/ClassSidebar.css";
import classDataLogo from "../../images/classDataLogo.png";
import { selectedClass } from "../../features/selectClassSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { InfoOutlined } from '@material-ui/icons';
import { IconButton, Modal, Fade, Backdrop } from '@material-ui/core';
import {CopyToClipboard} from 'react-copy-to-clipboard';

function ClassSidebar() {
    const history = useHistory();
    const selectClass = useSelector(selectedClass);
    const [open, setOpen] = React.useState(false);
    const [copied, setCopied] = useState(false)

    const onCopy = () => {
        setCopied(true)
    }

    const handleOpen = () => {
        setOpen(true);
        setCopied(false)
    };

    const handleClose = () => {
        setOpen(false);
        setCopied(false)
    };
    return (
        <div className="classSidebar" >
            <div className="classSidebar__classInfo">
                <img src={classDataLogo} alt="" />
                <h3>{selectClass.title}</h3>
                <div className="info_icon">
                    <IconButton
                        aria-haspopup="true"
                        onClick={handleOpen}
                    >
                        <InfoOutlined />
                    </IconButton>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className="info_modal"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className="info_fade">
                                <h2>{selectClass.title}</h2>
                                <p>Class Description: {selectClass.description}</p>
                                <p>Class Code: {selectClass.code}
                                    <CopyToClipboard text={selectClass.code} onCopy={onCopy}>
                                        <button>Copy Code</button>
                                    </CopyToClipboard>
                                </p>
                                <div>
                                    {copied ? <span class="code_copied">Code Copied!</span> : null}
                                </div>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </div>

            <div className="classSidebar__nav">
                <button
                    onClick={() => history.push("/classData/classFeed")}>
                    Announcements
            </button>
                <button onClick={() => history.push("/classData/meetings")}>
                    Meetings
                </button>
                <button onClick={() => history.push("/classData/myGrades")}>Grades</button>
                <button
                    onClick={() => history.push("/classData/classCabinet")} >
                    Class Cabinet
            </button>
                <button
                    onClick={() => history.push("/classData/classEnvironment")} >
                    Class Environment Dashboard
            </button>
            </div>

        </div>
    )
}

export default ClassSidebar
