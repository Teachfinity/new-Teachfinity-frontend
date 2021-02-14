import { createSlice } from '@reduxjs/toolkit';

export const classesEnrolledSlice = createSlice({
  name: 'classesEnrolled',
  initialState: {
    classesEnrolled : [],
  },
  reducers: {
    addclassesEnrolled : (state,action) => {
     state.classesEnrolled = [...state.classesEnrolled , action.payload] ;
   },
   clearclassesEnrolled : (state) => {
     state.classesEnrolled = [] ;
   },

  },
});

export const { addclassesEnrolled, clearclassesEnrolled } = classesEnrolledSlice.actions;

export const selectClassesEnrolledList = state => state.classesEnrolled.classesEnrolled;

export default classesEnrolledSlice.reducer;