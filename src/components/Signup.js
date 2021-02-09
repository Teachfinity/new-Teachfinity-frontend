import React, { useState } from 'react'
import { Row } from "reactstrap";
import db , {auth} from "../firebase" ;
// import { CommonLoading } from 'react-loadingg';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


import "../css/Signup.css";

function Signup() {
    
    const nameRegex = /^[a-zA-Z\- ]{3,20}$/;
    const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: ""
    });
    


    const handleChange = (event) => {


        const { name, value } = event.target;

        let error = errors;

        setUser({...user , [name]: value})

       

        
        switch (name) {
            case 'firstname':
                error.firstname =
                    nameRegex.test(value) && user.firstname.length > 0
                        ? '' : 'Name must be atleast 3 characters long';
                break;

            case 'lastname':
                error.lastname =
                    nameRegex.test(value) && user.lastname.length > 0
                        ? '' : ' Name must be atleast 3 characters long!';
                break;
            case 'email':
                error.email =
                    validEmailRegex.test(value) && user.email.length > 0
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                error.password =
                    passwordRegex.test(value) && user.password.length > 0
                        ? "" : 'Password must be 8 characters long with atleast one Uppercase and numeric character !'
                    ;
                break;
            case 'confirmpassword':
                error.confirmpassword =
                    value !== user.password && user.confirmpassword.length > 0
                        ? 'password and Confirm password fields donot match' : ''
                    ;
                break;
            default:
                break;
        }

        setErrors(error);


    }

    const displayName = user.firstname + " "+  user.lastname ;

    const handleSubmit = (event) => {
        event.preventDefault() ;

        auth.createUserWithEmailAndPassword(
            user.email , user.password
        ).then((user) => {
            auth.currentUser.updateProfile({displayName}) ;
            
        })
        .then(()=> {
            db.collection("users")
            .doc(auth.currentUser.uid).set({
                uid : auth.currentUser.uid ,
                email: auth.currentUser.email ,
                displayName: displayName,
                displayPic: auth.currentUser.photoURL,

            })
        })
        .catch(err => alert(err.message))

    }

    return (

        <div className="signup__background">
            <div className="signup__background-cover">
                <div className="signup__container1">
                    <Row className="signup__rowss">
                        <div>
                            <div className="signup__container2">
                              {/*   {loading ? <CommonLoading color='#ffff' size='large' /> : null} */}
                                <ValidatorForm onSubmit={() => {}} >
                                    <br></br><h1>Signup</h1><br></br>
                                    <div className="textfields">
                                        <TextValidator
                                            label="First Name"
                                            name="firstname"
                                            onChange={handleChange}
                                            value={user.firstname}
                                            variant="outlined"

                                            placeholder="First Name"
                                            className="textfields"
                                        />
                                        {errors.firstname.length > 0 && <span className='error'>{errors.firstname}</span>}
                                    </div>
                                    <div className="textfields">
                                        <TextValidator
                                            label="Last Name"
                                            name="lastname"
                                            onChange={handleChange}

                                            value={user.lastname}
                                            placeholder="Last Name"
                                            variant="outlined"
                                            className="textfields"
                                        />
                                        {errors.lastname.length > 0 && <span className='error'>{errors.lastname}</span>}
                                    </div>
                                    <div className="textfields">
                                        <TextValidator
                                            label="Email"
                                            name="email"
                                            onChange={handleChange}
                                            value={user.email}
                                            placeholder="Please enter your Email Address"
                                            variant="outlined"
                                            className="textfields"
                                        />
                                        {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                                    </div>
                                    <div className="textfields">
                                        <TextValidator
                                            label="Password"
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            value={user.password}
                                            variant='outlined'
                                            className="textfields"
                                        />
                                        {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                                    </div>
                                    <div className="textfields">
                                        <TextValidator
                                            name="confirmpassword"
                                            label="Confirm Password"
                                            type="password"
                                            placeholder="Confirm Password"
                                            variant="outlined"
                                            onChange={handleChange}
                                            value={user.confirmpassword}
                                            className="textfields"
                                        />
                                        {errors.confirmpassword.length > 0 && <span className='error'>{errors.confirmpassword}</span>}
                                    </div>
                                    <div><button className="signup__button" type="submit" onClick={handleSubmit}>Register</button></div>

                                </ValidatorForm>
                            </div>
                        </div>

                        <div>
                            <div className="signup__container3">

                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Signup
