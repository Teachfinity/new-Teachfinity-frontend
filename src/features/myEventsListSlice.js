import { createSlice } from '@reduxjs/toolkit';

export const myEventsListSlice = createSlice({
  name: 'eventList',
  initialState: {
    events : [],
    mid: []
  },
  reducers: {
   addEvent : (state,action) => {
     state.events = [...state.events , action.payload] ;
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

  },
});

export const { addEvent, clearEvent, addMid,clearMid } = myEventsListSlice.actions;

export const selectmyEventsList = state => state.eventList.events;
export const selectmyMid = state => state.eventList.mid;

export default myEventsListSlice.reducer;