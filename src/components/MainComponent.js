import React from 'react'
import Header from "./Header";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import QuizEngine from "./quizData/QuizEngine";
import QuestionGenerator from "./quizData/QuestionGenerator";
import Questions from "./quizData/Questions";
import Timetable from "./timetableData/Timetable";
import Diary from "./Diary";
import { selectAvatarMenuIsOpen } from "../features/avatarMenuSlice";
import { selectEditProfileModalIsOpen } from "../features/editProfileSlice";
import { useSelector } from "react-redux";
import "../css/MainComponent.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import MyClasses from "./MyClasses";
import EditProfileForm from './EditProfile';
import AvatarMenu from './AvatarMenu';
import ClassData from './ClassData';


function MainComponent() {
    const isModalOpen = useSelector(selectEditProfileModalIsOpen);
    const isAvatarMenuOpen = useSelector(selectAvatarMenuIsOpen);
    return (
        <Router>
            <div className="mainComponent">
                <Header />

                <div className="mainComponent__body">
                    <div className="mainComponent__sidebar">
                        <Sidebar />
                    </div>
                    <div className="mainComponent__content">

                        <Switch>
                            <Route path="/myclasses" >
                                <MyClasses />
                            </Route>
                            <Route path="/chats" >
                                <Chat />
                            </Route>
                            <Route path="/mydiary" >
                                <Diary />
                            </Route>
                            <Route exact path="/quiz" >
                                <QuizEngine />
                            </Route>
                            <Route exact path="/quiz/generatequestions" >
                                <QuestionGenerator />
                            </Route>
                            <Route exact path="/quiz/generatequestions/questions" >
                                <Questions />
                            </Route>
                            <Route path="/timetable" >
                                <Timetable />
                            </Route>
                            <Route path="/classData" >
                                <ClassData />
                            </Route>
                            <Redirect to="/myclasses" />
                        </Switch>



                    </div>

                </div>
                {isAvatarMenuOpen && <AvatarMenu />}
                {isModalOpen && <EditProfileForm />}
            </div>
        </Router>
    )
}

export default MainComponent