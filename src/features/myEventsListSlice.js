import { createSlice } from '@reduxjs/toolkit';

export const myEventsListSlice = createSlice({
  name: 'eventList',
  initialState: {
    events : [],
    mid: [] ,
    newevent: false
  },
  reducers: {
   addEvent : (state,action) => {
     state.events =   [...state.events , action.payload] ;
   },
   clearEvent : (state) => {
     state.events = [] ;
   },
   addMid : (state,action) => {
     state.mid = [...state.mid , action.payload] ;
   },
   clearMid : (state) => {
     state.mid = [] ;
   },
   NewEvent : (state,action) => {
     state.newevent =   action.payload
   },
   

  },
});

export const { addEvent, clearEvent, addMid,clearMid , NewEvent } = myEventsListSlice.actions;

export const selectmyEventsList = state => state.eventList.events;
export const selectmyMid = state => state.eventList.mid;
export const selectNewEvent = state => state.eventList.newevent;

export default myEventsListSlice.reducer;