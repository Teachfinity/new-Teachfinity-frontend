import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import classReducer from "../features/createClassSlice" ;
import avatarMenuReducer from "../features/avatarMenuSlice" ;
export default configureStore({
  reducer: {
    user: userReducer,
    class: classReducer  ,
    avatarMenu: avatarMenuReducer ,
  },
});
