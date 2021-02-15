import React, {useEffect, useState} from 'react';
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios" ;
import { useSelector, useDispatch } from "react-redux";
import { closeEventMenu, selectEventIsOpen } from "../../features/TimetableSlice";
import { selectMyClassList, addClass , clearClass } from "../../features/myClassListSlice";
import { addEvent } from "../../features/myEventsListSlice";
import {userSlice} from "../../features/userSlice" ;
import DateFnsUtils from '@date-io/date-fns';
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText, makeStyles } from '@material-ui/core'
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

    const dispatch = useDispatch();
    const classList = useSelector(selectMyClassList);
    const classes = useStyles();

    const [classs, setClass] = useState('');

    const [events, setEvents] = useState({title: '', start: new Date(), end: new Date()});
    const [eventname, setEventname] = useState("");
    const [selecteddate, Setselecteddate] = useState(selected);
    const [date, Setdate] = useState(startdate);
    const [enddate, Setenddate] = useState(endate);

    const handleChange = (event) => {
        setClass(event.target.value);
    };
    const toggleModal= () =>{
        dispatch(closeEventMenu())
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        dispatch(addEvent({name: events.title, startTime: events.start, endTime: events.end, classroom: classs}));
        const AddEvent = {
            name: events.title, 
            startTime: events.start, 
            endTime: events.end, 
            classroom: classs
        }
          
        axios.post('http://localhost:5000/meetings/addmeeting', AddEvent)
        .then((res) => {
            axios.put('http://localhost:5000/classes/updateclass/'+res.data.classroom+'/meeting/'+res.data._id)
            .then(() => {
              alert("Meeting added in class successfully")
            }).catch(err => alert(err))
        })
        .catch(err => alert(err))
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
                            minDate={new Date("2021-01-01T00:00")}
                            format="yyyy/MM/dd hh:mm a"
                        />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            value={enddate}
                            label="Select End Date/Time"
                            onChange={handleEndDateChange}
                            minDate={new Date("2021-01-01T00:00")}
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
                                <MenuItem value={item.id}>{item.name}</MenuItem>
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