import { createSlice } from '@reduxjs/toolkit';

export const editProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileisOpen: false
  },
  reducers: {
    openEditProfile: state => {
     state.profileisOpen = true ;
   },
   closeEditProfile: state => {
    state.profileisOpen = false ;
   }
  },
});

export const { openEditProfile , closeEditProfile } = editProfileSlice.actions;

export const selectEditProfileModalIsOpen = state => state.profile.profileisOpen;

export default editProfileSlice.reducer;