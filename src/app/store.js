import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import classReducer from "../features/createClassSlice" ;
import avatarMenuReducer from "../features/avatarMenuSlice" ;
import editProfileReducer from "../features/editProfileSlice" ;
import classListReducer from "../features/myClassListSlice" ;
import classCodeReducer from "../features/classCodeSlice" ;
export default configureStore({
  reducer: {
    user: userReducer,
    class: classReducer  ,
    avatarMenu: avatarMenuReducer ,
    profile: editProfileReducer ,
    classList: classListReducer,
    classCode: classCodeReducer
  },
});
