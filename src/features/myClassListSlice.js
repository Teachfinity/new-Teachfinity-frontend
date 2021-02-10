import { createSlice } from '@reduxjs/toolkit';

export const myClassListSlice = createSlice({
  name: 'classList',
  initialState: {
    classes : []
  },
  reducers: {
   addClass : (state,action) => {
     state.classes = [...state.classes , action.payload] ;
   },

  },
});

export const { addClass } = myClassListSlice.actions;




export const selectMyClassList = state => state.classList.classes;

export default myClassListSlice.reducer;
