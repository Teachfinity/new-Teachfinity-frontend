import React , {useState, useEffect} from 'react' ;
import "../../css/ClassMeetings.css" ;
import Meeting from "./Meeting" ; 
import {useDispatch , useSelector} from "react-redux" ;
import {selectedClass} from "../../features/selectClassSlice";
import {addMid , clearMid, selectmyMid , addEvent , clearEvent ,
    selectmyEventsList , selectNewEvent , clearNewEvent} from "../../features/myEventsListSlice" ;
import axios from "axios" ;
import {UpworkJobLoader} from "../content-loader" ;
function ClassMeetings() {
    const dispatch = useDispatch() ;
    const myEventsList = useSelector(selectmyEventsList) ;
    const selectClass = useSelector(selectedClass) ;
    const [isBusy, setBusy] = useState(true) ;
    useEffect(() => {
        dispatch(clearEvent()) ;
        axios.get("http://localhost:5000/meetings/getmeetings/class/" + selectClass.id)
        .then((res)=>{
            res.data.map(meeting => {
                dispatch(addEvent({
                    id: meeting._id,
                    title: meeting.name ,
                    start: meeting.startTime,
                    end:  meeting.endTime 
                }));
            })
        })
        .then(()=> {
            setBusy(false)
        })
        .catch(err => alert(err))
    } , [isBusy])
    return (
        <div className="classMeetings" >
            <p>Meetings</p>
           
            {myEventsList.length===0 ? 
            <p class="classMeetings__noclasses">No meetings to Show</p>
            :
            <div className="classMeetings__list">
            {myEventsList && myEventsList.map((item) => (
                <Meeting meetingId={item.id}  meetingName={item.title} startTime={item.start} endTime={item.end} />
            ))}
            </div>
            }
        </div>
    )
}

export default ClassMeetings
