import { createSlice } from '@reduxjs/toolkit';

export const myClassListSlice = createSlice({
  name: 'classList',
  initialState: {
    classes : [],
    newclass: false ,
  },
  reducers: {
   addClass : (state,action) => {
     state.classes = [...state.classes , action.payload] ;
   },
   clearClass : (state) => {
     state.classes = [] ;
   },
   newClass : (state) => {
     state.newclass = !state.newclass ;
   },

  },
});

export const { addClass, clearClass, newClass } = myClassListSlice.actions;
export const selectnewClass = state => state.classList.newclass;




export const selectMyClassList = state => state.classList.classes;

export default myClassListSlice.reducer;
