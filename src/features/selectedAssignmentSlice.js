import { createSlice } from '@reduxjs/toolkit';

export const selectedAssignmentSlice = createSlice({
  name: 'selectedAssignment',
  initialState: {
    assignment: null
  },
  reducers: {
   addAssignment : (state,action) => {
     state.assignment = action.payload ;
   },
  },
});

export const { addAssignment} = selectedAssignmentSlice.actions;

export const selectedAssignment = state => state.selectedAssignment.assignment;

export default selectedAssignmentSlice.reducer;
