import { createSlice } from '@reduxjs/toolkit';

export const classSlice = createSlice({
  name: 'class',
  initialState: {
    classModalIsOpen: false
  },
  reducers: {
   openModal: state => {
     state.classModalIsOpen = true ;
   },
   closeModal: state => {
    state.classModalIsOpen = false ;
   }
  },
});

export const { openModal , closeModal } = classSlice.actions;




export const selectClassModalIsOpen = state => state.class.classModalIsOpen;

export default classSlice.reducer;
