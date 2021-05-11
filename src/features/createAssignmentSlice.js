import { createSlice } from '@reduxjs/toolkit';

export const assignmentSlice = createSlice({
    name: 'assignmentList',
    initialState: {
        assignments : [],
        newassignment: false ,
        assignmentModalIsOpen: false
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
     openModal: state => {
      state.assignmentModalIsOpen = true ;
    },
    closeModal: state => {
     state.assignmentModalIsOpen = false ;
    }
  
    },
  });
  
  export const { addAssignment, clearAssignment, newAssignment, openModal , closeModal } = assignmentSlice.actions;
  export const selectnewAssignment = state => state.assignmentList.newassignment;
  export const selectAssignmentModalIsOpen = state => state.class.assignmentModalIsOpen;
  export const selectMyAssignmentList = state => state.assignmentList.assignments;
  
  export default assignmentSlice.reducer;
  