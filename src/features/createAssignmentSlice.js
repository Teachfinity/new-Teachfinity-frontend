import { createSlice } from '@reduxjs/toolkit';

export const assignmentSlice = createSlice({
    name: 'assignmentList',
    initialState: {
        assignments : [],
        newassignment: false ,
    },
    reducers: {
     addAssignment : (state,action) => {
       state.assignments = [...state.assignments , action.payload] ;
     },
     clearAssignment : (state) => {
       state.assignments = [] ;
     },
     newAssignment : (state) => {
       state.newassignment = !state.newassignment ;
     },
  
    },
  });
  
  export const { addAssignment, clearAssignment, newAssignment } = assignmentSlice.actions;
  export const selectnewAssignment = state => state.assignmentList.newAssignment;
  
  export const selectMyAssignmentList = state => state.assignmentList.assignments;
  
  export default assignmentSlice.reducer;
  