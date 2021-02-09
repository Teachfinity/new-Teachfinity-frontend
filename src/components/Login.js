import React, { useState } from 'react';
import { Label, Button, Row } from "reactstrap";
// import { CommonLoading } from 'react-loadingg';
import { Checkbox } from "@material-ui/core";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { GoogleLoginButton } from "react-social-login-buttons";
import {useHistory} from "react-router-dom" ;

import "../css/Login.css";
import db, { auth , provider } from '../firebase';

function Login() {
   
    const history = useHistory() ;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({email: '' });
    // const [loading, setLoading] = useState("");


    const handleChange = (event) => {
        const { name, value } = event.target;
        let error = errors;
        if (name === "email") {
            setEmail(value);
        }
        else if (name === "password") {
            setPassword(value);
        }

        switch (name) {
            case 'email':
                error.email = (emailRegex.test(value) && email.length > 0) ? '' : 'Email is not valid!';
                break;
            default: ;
                break;
        }

        setErrors( error );
       


    }

    const handleSubmit = (event) => {
        event.preventDefault() ;

        auth.signInWithEmailAndPassword(
            email, password
        ).then((user) => {
            console.log(user) ;
            alert("Login Successful") ;
        }).catch(err => alert(err.message)) ;
    }

      const   handleGoogleLogin = () => {
            auth.signInWithPopup(provider)
            .then(({user})=> {
                console.log(user) ;
                db.collection("users")
                .doc(auth.currentUser.uid).set({
                    uid : user.uid ,
                    email: user.email ,
                    displayName: user.displayName,
                    displayPic: user.photoURL,
    
                })
            }).catch(err => alert(err) )

        }

    return (

        <div className="login__background">
            <div className="login__background-cover">
                <div className="login-container2">
                    <Row className="login__rowss">
                        <div>
                            <div className="login-container1">


                                <ValidatorForm onSubmit={() => {}} >
                                    {/* { this.state.loading ? <CommonLoading /> : null } */}
                                    <br></br><h1>Login</h1><br></br>
                                    <div className="textfields form-group" >
                                        {/* { loading ? <CommonLoading /> : null } */}
                                        <TextValidator
                                            label="Email"
                                            name="email"
                                            onChange={handleChange}
                                            value={email}
                                            placeholder="Please enter your Email Address"
                                            className="textfields"

                                        />
                                       {errors.email.length > 0 && <soan className="login__error">{errors.email}</soan>}

                                    </div>
                                    <div className="textfields">
                                        <TextValidator

                                            label="Password"
                                            name="password"
                                            onChange={handleChange}
                                            value={password}
                                            placeholder="Please enter your Password"
                                            type="password"
                                            className="textfields"
                                        />
                                    </div>
                                    <div className="rowin">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color='primary'
                                                />
                                            }
                                            label="Remember Me?"
                                        />
                                        <Label><b>Forgot Password?</b></Label>
                                    </div>
                                    <Button className="login-button" type="submit" onClick={handleSubmit}>Log in</Button><br></br>
                                    <br></br><h5>OR</h5>
                                    {/* <div className="login__socialButtons" ><FacebookLoginButton /></div> */} 
                                    
                                    <div className="login__socialButtons" ><GoogleLoginButton 
                                        style={{  background: "#d85645" , color: "white" ,}}
                                        activeStyle={{background:"#ce3925" , color: "white"}}
                                        onClick={handleGoogleLogin}
                                    /></div>



                                    <div>
                                        <button className="login__nav-link" onClick={() => history.push("/signup")}  >
                                            <br></br><h6>Don't have an account?</h6>
                                            <p>Sign up</p>
                                        </button>


                                    </div>

                                </ValidatorForm>
                            </div>


                        </div>


                        <div>
                            <div className="login-container3">

                            </div>
                        </div>
                    </Row>
                </div>
            </div>

        </div>

    )
}

export default Login
