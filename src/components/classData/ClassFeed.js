import React , {useEffect , useState} from 'react' ;
import "../../css/ClassFeed.css" ;
import MessageSender from './MessageSender' ;
import Post from './Post' ;
import axios from "axios" ;
import {selectedClass} from "../../features/selectClassSlice" ;
import {useSelector , useDispatch} from "react-redux" ;
import {selectNewPost ,addPost , clearPost , selectMyPostList} from "../../features/postListSlice" ;
import {addStudent, clearStudent , selectMystudentList} from "../../features/studentListSlice" ;
import { IconButton, Modal, Fade, Backdrop, Avatar } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MyLoader from "../content-loader" ;
function ClassFeed() {
    const dispatch = useDispatch() ;
    const selectClass = useSelector(selectedClass) ;
    const postList = useSelector(selectMyPostList) ;
    const studentList = useSelector(selectMystudentList) ;
    const isNewPost = useSelector(selectNewPost) ;
    const [isBusy , setBusy] = useState(true) ;
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        /* response for the post  */
        dispatch(clearStudent())
        dispatch(clearPost())
        axios.get("http://localhost:5000/posts/getposts/"+selectClass.id)
        .then((res) => {
            /* Array in response */
            console.log(res.data);
            dispatch(addPost(res.data)) ;
        })
        .then(()=>{
            axios.get("http://localhost:5000/classes/getstudents/class/"+selectClass.id)
            .then((resp)=>{
                resp.data.map((student)=>{
                    dispatch(addStudent({name: student.sid.name, profile: student.sid.profilePicture}))
                })
            })
        })
        .then(()=>{
            setTimeout(() => {
                setBusy(false) ;
              }, 2000);
        })
        .catch(err => alert("MY FEED SAYs" + err))

        /* userId => diplay name and pic */
    } , [isNewPost])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="classFeed" >
            {/* Message Sender */}
            <div className="classFeed_header">
                <MessageSender />
                <div className="classfeed_icon">
                <IconButton
                        aria-haspopup="true"
                        onClick={handleOpen}
                >
                    <PeopleAltIcon className="classFeed_icon"></PeopleAltIcon>
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
                            <div className="members_info">
                                 {studentList.map((item)=>(
                                     <div className="class_members">
                                     <Avatar src={item.profile} className="post__avatar" />
                                     <p>{item.name}</p>
                                     </div>
                                 ))} 
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </div>
            {/* Posts on the feed */}
            {isBusy && postList ?
           (<div className="classFeed__loader" >
           <MyLoader />
           <MyLoader />
           <MyLoader />
           </div>
           )

                : 
            
            postList && postList.map(({_id, createdAt , creatorDisplay , creatorName , message , imagePath}) => (
                <Post 
                id = {_id}
                profilepic={creatorDisplay}
                 message={message} 
                 timestamp={createdAt}
                 username={creatorName}
                 image={imagePath}
                 /> ))
                
        
        }
        </div>
    )
}

export default ClassFeed
