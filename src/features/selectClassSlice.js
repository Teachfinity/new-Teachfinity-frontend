import { createSlice } from '@reduxjs/toolkit';

export const selectClassSlice = createSlice({
  name: 'selectedClass',
  initialState: {
    class: null
  },
  reducers: {
   addClass : (state,action) => {
     state.class = action.payload ;
   },

   
  },
});

export const { addClass} = selectClassSlice.actions;




export const selectedClass = state => state.selectedClass.class;

export default selectClassSlice.reducer;
