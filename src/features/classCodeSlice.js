import { createSlice } from '@reduxjs/toolkit';

export const classCodeSlice = createSlice({
  name: 'classCode',
  initialState: {
    classCodeisOpen: false
  },
  reducers: {
    openclassCode: state => {
     state.classCodeisOpen = true ;
   },
   closeclassCode: state => {
    state.classCodeisOpen = false ;
   }
  },
});

export const { openclassCode , closeclassCode } = classCodeSlice.actions;

export const selectclassCodeIsOpen = state => state.classCode.classCodeisOpen;

export default classCodeSlice.reducer;
