import { createSlice } from '@reduxjs/toolkit';

export const myEventsListSlice = createSlice({
  name: 'eventList',
  initialState: {
    events : [],
  },
  reducers: {
   addEvent : (state,action) => {
     state.events = [...state.events , action.payload] ;
   },
   clearEvent : (state) => {
     state.events = [] ;
   },

  },
});

export const { addEvent, clearEvent } = myEventsListSlice.actions;

export const selectmyEventsList = state => state.eventList.events;

export default myEventsListSlice.reducer;