import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import classReducer from "../features/createClassSlice" ;
import avatarMenuReducer from "../features/avatarMenuSlice" ;
import editProfileReducer from "../features/editProfileSlice" ;
import classListReducer from "../features/myClassListSlice" ;
import classesEnrolledSliceReducer from "../features/classesEnrolledSlice" ;
import classCodeReducer from "../features/classCodeSlice" ;
import timetableReducer from "../features/TimetableSlice" ;
import selectedClassReducer from "../features/selectClassSlice" ;
export default configureStore({
  reducer: {
    user: userReducer,
    class: classReducer  ,
    avatarMenu: avatarMenuReducer ,
    profile: editProfileReducer ,
    classList: classListReducer,
    classesEnrolled: classesEnrolledSliceReducer,
    classCode: classCodeReducer,
    timetable: timetableReducer,
    selectedClass: selectedClassReducer
  },
});
