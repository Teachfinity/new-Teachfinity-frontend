import { createSlice } from '@reduxjs/toolkit';

export const studentListSlice = createSlice({
  name: 'studentList',
  initialState: {
    students : [] ,
  },
  reducers: {
   addStudent : (state,action) => {
     state.students =  [...state.students, action.payload] ;
   },
   clearStudent : (state) => {
     state.students =  [];
   },

  },
});

export const { addStudent, clearStudent } = studentListSlice.actions;

export const selectMystudentList = state => state.studentList.students;

export default studentListSlice.reducer;
