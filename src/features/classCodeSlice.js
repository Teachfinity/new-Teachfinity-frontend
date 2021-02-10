import { createSlice } from '@reduxjs/toolkit';

export const classCodeSlice = createSlice({
  name: 'classCode',
  initialState: {
    classCodeisOpen: false ,
    code : null
  },
  reducers: {
    openclassCode: state => {
     state.classCodeisOpen = true ;
   },
   closeclassCode: state => {
    state.classCodeisOpen = false ;
   },
   changeClassCode: (state,action) => {
    state.code = action.payload ;
   }
  },
});

export const { openclassCode , closeclassCode,  changeClassCode } = classCodeSlice.actions;

export const selectclassCodeIsOpen = state => state.classCode.classCodeisOpen;

export const selectClassCode = state => state.classCode.code;

export default classCodeSlice.reducer;
