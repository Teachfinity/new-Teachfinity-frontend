import React, { useEffect, useState } from 'react'
import DateFnsUtils from '@date-io/date-fns';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Event from './Event';
import { selectEventIsOpen, openEventMenu} from "../../features/TimetableSlice";

import { selectMyClassList, addClass , clearClass } from "../../features/myClassListSlice";
import { selectClassesEnrolledList, addclassesEnrolled , clearclassesEnrolled } from "../../features/classesEnrolledSlice";
import { useSelector, useDispatch } from "react-redux";
import {addMid , clearMid, selectmyMid , addEvent , clearEvent ,
   selectmyEventsList , selectNewEvent , clearNewEvent} from "../../features/myEventsListSlice" ;
import axios from 'axios';

import moment from 'moment'

import "../../css/Timetable.css";

function Timetable(){
  const localizer = momentLocalizer(moment) 
  const dispatch = useDispatch();
  const classList = useSelector(selectMyClassList);
  
  const classenrolled = useSelector(selectClassesEnrolledList);
  const isModalOpen = useSelector(selectEventIsOpen);
  const now = new Date();
  const myEventsList = useSelector(selectmyEventsList) ;
  /*  [
  {
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours())),
    end: new Date(new Date().setHours(new Date().getHours())),
  },
  {
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
  {
    title: "Lecture 1",
    end: new Date("Wed Feb 17 2021 00:00:00 GMT+0500 (Pakistan Standard Time)"),
    start: new Date("Wed Feb 17 2021 11:00:00 GMT+0500 (Pakistan Standard Time)")
  } 
 
] */

  const [selecteddate, Setselecteddate] = useState("");
  const [date, Setdate] = useState("");
  const [enddate, Setenddate] = useState("");
  const [isBusy, setBusy] = useState(true);
  const [isListBusy, setListBusy] = useState(true);

  const onSlotChange = (slotInfo) => {
    Setselecteddate(moment(slotInfo.start.toLocaleString()).format("DD-MM-YYYY"))
    Setdate(moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DD HH:mm:ss"))
    Setenddate(moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DD HH:mm:ss"))
    //alert(this.state.selecteddate)
    toggleModal();
  }
  const toggleModal = () =>{
    dispatch(openEventMenu())
  }

  useEffect(()=>{
  //  Class You own 
  

   
    dispatch(clearMid()) ;
 dispatch(clearEvent()) ;
  
  
    classList.map(classid=>{
      axios.get("http://localhost:5000/classes/getclasses/" + classid.id)
      .then((res)=>{
        //console.log(res.data.meetings)
        {res.data.meetings.length>0 &&
          res.data.meetings.map(meeting => { 
          dispatch(addMid(meeting.mid))
          axios.get("http://localhost:5000/meetings/getmeetings/" + meeting.mid)
         .then((res) => {
           dispatch(addEvent({
             title: res.data[0].name ,
             start: new Date(res.data[0].startTime)  ,
             end:  new Date(res.data[0].endTime) 
           }));
         })
         .catch(err => alert(err))
        })}
      }).catch(err => alert(err)) 
    }) ; 
    // Classes Enrolled 
    classenrolled.map(classid=>{
      axios.get("http://localhost:5000/classes/getclasses/" + classid.id)
      .then((res)=>{
        //console.log(res.data.meetings)
        {res.data.meetings.length>0 &&
          res.data.meetings.map(meeting => {
          dispatch(addMid(meeting.mid))
          axios.get("http://localhost:5000/meetings/getmeetings/" + meeting.mid)
         .then((res) => {
           dispatch(addEvent({
             title: res.data[0].name ,
             start: new Date(res.data[0].startTime)  ,
             end:  new Date(res.data[0].endTime) 
           }));
         })
        })}
      })
      .catch(err => alert(err)) 
    }) ; 
    setTimeout(() => {
        setBusy(false) ;
    } , 3000) ;
  

} , [isModalOpen]) ;

    return (
      <div className="timetable">
        <Calendar className="timetable_background"
          localizer={localizer}
          selectable={true}
          //onSelectEvent={event => this.onEventClick(event)}
          onSelectSlot={(slotInfo) => onSlotChange(slotInfo)}
          events={isBusy ? [] : myEventsList}
          startAccessor="start"
          endAccessor="end"
        />
        {isModalOpen && <Event selected={selecteddate} startdate={date} endate={enddate} />}
      </div>
    )
}
export default Timetable;