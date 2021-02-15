import React, {useEffect, useState} from 'react';
import CloseIcon from "@material-ui/icons/Close";

import moment from 'moment'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { closeEventMenu, selectEventIsOpen } from "../../features/TimetableSlice";
import { selectUser } from "../../features/userSlice";
import { selectMyClassList, addClass , clearClass } from "../../features/myClassListSlice";
import DateFnsUtils from '@date-io/date-fns';
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText, makeStyles } from '@material-ui/core'
import axios from "axios";
import "../../css/Event.css";
import {
    Modal, ModalHeader, Form, FormGroup, Input, Label, Button
} from 'reactstrap';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function AddEvent({selected, startdate, endate}) {

    
  const myEventsList = [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2020, 0, 0),
      end: new Date(2020, 0, 1),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2015, 3, 7),
      end: new Date(2015, 3, 10),
    },
  
    {
      id: 2,
      title: 'DTS STARTS',
      start: new Date(2016, 2, 13, 0, 0, 0),
      end: new Date(2016, 2, 20, 0, 0, 0),
    },
  
    {
      id: 3,
      title: 'DTS ENDS',
      start: new Date(2016, 10, 6, 0, 0, 0),
      end: new Date(2016, 10, 13, 0, 0, 0),
    },
  
    {
      id: 4,
      title: 'Some Event',
      start: new Date(2015, 3, 9, 0, 0, 0),
      end: new Date(2015, 3, 10, 0, 0, 0),
    },
    {
      id: 5,
      title: 'Conference',
      start: new Date(2015, 3, 11),
      end: new Date(2015, 3, 13),
      desc: 'Big conference for important people',
    },
    {
      id: 6,
      title: 'Meeting',
      start: new Date(2015, 3, 12, 10, 30, 0, 0),
      end: new Date(2015, 3, 12, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
      id: 7,
      title: 'Lunch',
      start: new Date(2015, 3, 12, 12, 0, 0, 0),
      end: new Date(2015, 3, 12, 13, 0, 0, 0),
      desc: 'Power lunch',
    },
    {
      id: 8,
      title: 'Meeting',
      start: new Date(2015, 3, 12, 14, 0, 0, 0),
      end: new Date(2015, 3, 12, 15, 0, 0, 0),
    },
    {
      id: 9,
      title: 'Happy Hour',
      start: new Date(2015, 3, 12, 17, 0, 0, 0),
      end: new Date(2015, 3, 12, 17, 30, 0, 0),
      desc: 'Most important meal of the day',
    },
    {
      id: 10,
      title: 'Dinner',
      start: new Date(2015, 3, 12, 20, 0, 0, 0),
      end: new Date(2015, 3, 12, 21, 0, 0, 0),
    },
    {
      id: 11,
      title: 'Birthday Party',
      start: new Date(2015, 3, 13, 7, 0, 0),
      end: new Date(2015, 3, 13, 10, 30, 0),
    },
    {
      id: 12,
      title: 'Late Night Event',
      start: new Date(2015, 3, 17, 19, 30, 0),
      end: new Date(2015, 3, 18, 2, 0, 0),
    },
    {
      id: 12.5,
      title: 'Late Same Night Event',
      start: new Date(2015, 3, 17, 19, 30, 0),
      end: new Date(2015, 3, 17, 23, 30, 0),
    },
    {
      id: 13,
      title: 'Multi-day Event',
      start: new Date(2020, 3, 20, 19, 30, 0),
      end: new Date(2020, 3, 22, 2, 0, 0),
    },
    {
      id: 14,
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
      id: 16,
      title: 'Video Record',
      start: new Date(2015, 3, 14, 15, 30, 0),
      end: new Date(2015, 3, 14, 19, 0, 0),
    },
    {
      id: 17,
      title: 'Dutch Song Producing',
      start: new Date(2015, 3, 14, 16, 30, 0),
      end: new Date(2015, 3, 14, 20, 0, 0),
    },
    {
      id: 18,
      title: 'Itaewon Halloween Meeting',
      start: new Date(2015, 3, 14, 16, 30, 0),
      end: new Date(2015, 3, 14, 17, 30, 0),
    },
    {
      id: 19,
      title: 'Online Coding Test',
      start: new Date(2015, 3, 14, 17, 30, 0),
      end: new Date(2015, 3, 14, 20, 30, 0),
    },
    {
      id: 20,
      title: 'An overlapped Event',
      start: new Date(2015, 3, 14, 17, 0, 0),
      end: new Date(2015, 3, 14, 18, 30, 0),
    },
    {
      id: 21,
      title: 'Phone Interview',
      start: new Date(2015, 3, 14, 17, 0, 0),
      end: new Date(2015, 3, 14, 18, 30, 0),
    },
    {
      id: 22,
      title: 'Cooking Class',
      start: new Date(2015, 3, 14, 17, 30, 0),
      end: new Date(2015, 3, 14, 19, 0, 0),
    },
    {
      id: 23,
      title: 'Go to the gym',
      start: new Date(2015, 3, 14, 18, 30, 0),
      end: new Date(2015, 3, 14, 20, 0, 0),
    },
    ]

    const dispatch = useDispatch();
    const isModalOpen = useSelector(selectEventIsOpen);
    const classList = useSelector(selectMyClassList);
    const classes = useStyles();

    const [classs, setClass] = React.useState('');
    const { register, handleSubmit, errors } = useForm();

    const [events, setEvents] = useState({title: '', start: new Date(), end: new Date()});
    const [eventname, setEventname] = useState("");
    const [selecteddate, Setselecteddate] = useState(selected);
    const [date, Setdate] = useState(startdate);
    const [enddate, Setenddate] = useState(endate);

    const handleChange = (event) => {
        setClass(event.target.value);
    };
    const onSubmit = formData => {

    }
    const toggleModal= () =>{
        dispatch(closeEventMenu())
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        myEventsList.push(events);
        console.log(events)
        toggleModal();
        setEventname("")
      }
      const updatestate = (event) => {
        const { value } = event.target;
        setEventname( value);
        setEvents({
            title: value,
            start: new Date(date),
            end: new Date(enddate),
        })
    }
      const handleDateChange = (sdate) => {
        setEvents({
            title: eventname,
            start: new Date(sdate),
            end: new Date(enddate),
        })
        Setdate(sdate)
      };
      const handleEndDateChange = (edate) => {
        setEvents({
            title: eventname,
            start: new Date(date),
            end: new Date(edate),
        })
        Setenddate(edate)
    };
    return (

        <div>
            <div className="event" >
                <div className="event__header">
                    <p>Add Event: {selecteddate}</p>
                    {<CloseIcon onClick={() => dispatch(closeEventMenu())} />}
                </div>
                <form onSubmit={onFormSubmit}>
                    <FormGroup className="event_form_group">
                        <TextField onChange={updatestate} label="Event Name" placeholder="Enter title for event..." required="true" className="eventlabel"></TextField>
                    </FormGroup>
                    <div className="event__timepickers">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            value={date}
                            label="Select Start Date/Time"
                            onChange={handleDateChange}
                            minDate={new Date("2018-01-01T00:00")}
                            format="yyyy/MM/dd hh:mm a"
                        />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            value={enddate}
                            label="Select End Date/Time"
                            onChange={handleEndDateChange}
                            minDate={new Date("2018-01-01T00:00")}
                            format="yyyy/MM/dd hh:mm a"
                        />
                    </MuiPickersUtilsProvider>
                    </div>
                    <div className="event_classes">
                    <FormControl required className={classes.formControl}>
                        <InputLabel id="demo-simple-select-required-label">Select Class</InputLabel>
                        <Select 
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={classs}
                            onChange={handleChange}
                            className={classes.selectEmpty}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {classList.map(item => (
                                <MenuItem value={item.name}>{item.name}</MenuItem>
                            )
                            )}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                    </div>
                    <button className="event_button" type="submit"  >Create</button>

                </form>
            </div>
        </div>

    )
}

export default AddEvent