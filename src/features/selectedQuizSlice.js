import { createSlice } from '@reduxjs/toolkit';

export const selectedQuizSlice = createSlice({
  name: 'selectedQuiz',
  initialState: {
    quiz: null
  },
  reducers: {
   addQuiz : (state,action) => {
     state.quiz = action.payload ;
   },
  },
});

export const { addQuiz } = selectedQuizSlice.actions;

export const selectedQuiz = state => state.selectedQuiz.quiz;

export default selectedQuizSlice.reducer;
