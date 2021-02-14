import { createSlice } from '@reduxjs/toolkit';

export const timetableSlice = createSlice({
  name: 'timetable',
  initialState: {
    eventisOpen: false
  },
  reducers: {
    openEventMenu: state => {
     state.eventisOpen = true ;
   },
   closeEventMenu: state => {
    state.eventisOpen = false ;
   }
  },
});

export const { openEventMenu , closeEventMenu } = timetableSlice.actions;

export const selectEventIsOpen = state => state.timetable.eventisOpen;

export default timetableSlice.reducer;