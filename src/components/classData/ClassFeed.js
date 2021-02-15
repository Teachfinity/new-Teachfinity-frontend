import React , {useEffect , useState} from 'react' ;
import "../../css/ClassFeed.css" ;
import MessageSender from './MessageSender' ;
import Post from './Post' ;
import axios from "axios" ;
import {selectedClass} from "../../features/selectClassSlice" ;
import {useSelector , useDispatch} from "react-redux" ;
import {selectNewPost ,addPost , clearPost , selectMyPostList} from "../../features/postListSlice" ;

function ClassFeed() {
    const dispatch = useDispatch() ;
    const selectClass = useSelector(selectedClass) ;
    const postList = useSelector(selectMyPostList) ;
    const isNewPost = useSelector(selectNewPost) ;
    const [isBusy , setBusy] = useState(true) ;
    useEffect(() => {
        /* response for the post  */
        axios.get("http://localhost:5000/posts/getposts/"+selectClass.id)
        .then((res) => {
            /* Array in response */
            dispatch(addPost(res.data)) ;
        })
        .then(()=>{
            setTimeout(() => {
                setBusy(false) ;
              }, 2000);
        })
        .catch(err => alert("MY FEED SAYs" + err))

        /* userId => diplay name and pic */
    } , [isNewPost])
    return (
        <div className="classFeed" >
            {/* Message Sender */}
            <MessageSender />
            {/* Posts on the feed */}
            {isBusy && postList ?
            <p>No Posts to show</p>
                : 
            
            postList && postList.map(({createdAt , creatorDisplay , creatorName , message , imagePath}) => (
                <Post profilepic={creatorDisplay}
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
