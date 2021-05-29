import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectNewPost, newPost } from "../../features/postListSlice";
import { StarBorder, Star, MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import "../../css/Post.css";
import moment from 'moment';
import axios from "axios";
import {toast} from 'react-toastify';

toast.configure();

function Post({ id, profilepic, message, timestamp, username, image }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const time = moment(timestamp).format('hh:mm A ');
    const date = moment(timestamp).format('DD-MM-YYYY');
    const currentDate = Date().toLocaleString()
    const currdate = moment(currentDate).format('DD-MM-YYYY');
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const [comment, setComment] = useState("");
    const user = useSelector(selectUser);
    const isNewPost = useSelector(selectNewPost);
    const [isBusy, setBusy] = useState(true);
    const dispatch = useDispatch();

    const successNotify = () =>{
        toast.success("Reminder Added to Diary!" ,
        {
            position: toast.POSITION.TOP_RIGHT,
        })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/posts/getposts/id/" + id)
            .then((res) => {
                /* Array in response */
                if (res.data.comments[0] !== undefined) {
                    setComments(res.data.comments)
                }
                setLikes(res.data.likes)
            })
            .then(() => {
                setTimeout(() => {
                    setBusy(false);
                }, 2000);
            })
            .catch(err => console.log("MY FEED SAYs" + err))
    }, [id, isNewPost])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
      const handleClose = () => {
        setAnchorEl(null);
    };

    const postLikes = (event) => {
        event.preventDefault();
        axios.put("http://localhost:5000/posts/updatepost/" + id + "/likes")
            .then(() => {
                dispatch(newPost())
            })
            .catch(err => alert("Error says " + err))
        setLiked(true)
    }
    const postUnlike = (event) => {
        event.preventDefault();
        axios.put("http://localhost:5000/posts/updatepost/" + id + "/unlike")
            .then(() => {
                dispatch(newPost())
            })
            .catch(err => alert("Error says " + err))
        setLiked(false)
    }
    const postComment = (event) => {
        event.preventDefault();
        axios.put("http://localhost:5000/posts/updatepost/" + id + "/user/" + user.displayName + "/comment/" + comment)
            .then(() => {
                dispatch(newPost())
            })
            .catch(err => alert("Error says " + err))
        setComment("")
    }
    const deletePost = (id) =>{
        axios.delete("http://localhost:5000/posts/delpost/"+id)
        .then(() => {
            dispatch(newPost())
        })
        .catch(err => alert("Error says " + err))
        handleClose()
    }
    const addToDiary = (message) =>{
        axios.put('http://localhost:5000/users/updateuser/'+user.uid+'/task/'+message)
        .then(()=>{
            successNotify()
        })
    }

    return (
        <div className="post" >
            <div className="post_icon">
                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVert />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                <MenuItem>Edit Post</MenuItem>
                <MenuItem onClick={()=>deletePost(id)}>Delete Post</MenuItem>
                <MenuItem onClick={()=>addToDiary(message)}>Add To Diary</MenuItem>
                </Menu>
            </div>
            <div className="post__top">
                <Avatar src={profilepic} className="post__avatar" />
                <div className="post__topinfo">
                    <h3>{username}</h3>
                    {
                        date < currdate ? <p>{date} at {time}</p> : <p>{time}</p>
                    }
                </div>
            </div>

            <div className="post__bottom">
                <p>{message}</p>
            </div>
            {image ?
                (<div className="post__image">
                    <img src={image} alt="" />
                </div>)
                : (<></>)
            }
            <div className="post_contentbar">
                <div className="post_likes">
                    {liked ? <Star onClick={postUnlike} className="thumbs_up_clicked"></Star> : <StarBorder onClick={postLikes} className="thumbs_up"></StarBorder>}
                    <div>
                        {likes}
                    </div>
                </div>
            </div>
            <div className="post_comments">
                {comments.map((comm) => (
                    <p>
                        <strong>{comm.commentor}</strong>{comm.comment}
                        <div>
                            {moment(comm.time).format('DD-MM-YYYY') < currdate ? <p>{moment(comm.time).format('DD-MM-YYYY')}  {moment(comm.time).format('hh:mm A ')}</p> : <p>{moment(comm.time).format('hh:mm A ')}</p>}
                        </div>
                    </p>
                ))}
            </div>
            <form className="post_commentbox">
                <input
                    className="post_input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    disabled={!comment}
                    className= {`${!comment ? "post_button" : "post_button_active"}`}
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </button>
            </form>

        </div>
    )
}

export default Post
