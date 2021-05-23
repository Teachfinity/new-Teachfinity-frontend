import { createSlice } from '@reduxjs/toolkit';

export const quizDataSlice = createSlice({
  name: 'quizData',
  initialState: {
    data: ""
  },
  reducers: {
   addData : (state,action) => {
     state.data = action.payload ;
   },
  },
});

export const {addData} = quizDataSlice.actions;

export const quizData = state => state.quizData.data;

export default quizDataSlice.reducer;
