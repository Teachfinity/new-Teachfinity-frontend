import React from 'react';
import CloseIcon from "@material-ui/icons/Close";
import { closeModal } from "../../features/createClassSlice";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { closeEventMenu } from "../../features/TimetableSlice";
import { selectUser } from "../../features/userSlice";
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";
import "../../css/Event.css";
import {
    Modal, ModalHeader, Form, FormGroup, Input, Label, Button
} from 'reactstrap';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';

function AddEvent({ selecteddate }) {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const { register, handleSubmit, errors } = useForm();
    var currentUser = null;

    const onSubmit = formData => {

        dispatch(closeModal());

    }
    return (

        <div>
            <div className="event" >
                <div className="event__header">
                    <p>Add Event: {selecteddate}</p>
                    {<CloseIcon onClick={() => dispatch(closeEventMenu())} />}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label className="eventlabel" for="eventname">Event Name:</Label>
                        <Input className="eventinput" type="text" id="eventname"
                            placeholder="Enter title for event..."></Input>
                    </FormGroup>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            label="Select Start Date/Time"
                            minDate={new Date("2018-01-01T00:00")}
                            format="yyyy/MM/dd hh:mm a"
                        />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            label="Select End Date/Time"
                            minDate={new Date("2018-01-01T00:00")}
                            format="yyyy/MM/dd hh:mm a"
                        />
                    </MuiPickersUtilsProvider>
                    <button onClick={() => alert("Event Added")} type="submit"  >Create</button>

                </form>
            </div>
        </div>

    )
}

export default AddEvent