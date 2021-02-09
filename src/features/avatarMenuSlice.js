import { createSlice } from '@reduxjs/toolkit';

export const avatarMenuSlice = createSlice({
  name: 'avatarMenu',
  initialState: {
    isOpen: false
  },
  reducers: {
   openAvatarMenu: state => {
     state.isOpen = true ;
   },
   closeAvatarMenu: state => {
    state.isOpen = false ;
   }
  },
});

export const { openAvatarMenu , closeAvatarMenu } = avatarMenuSlice.actions;




export const selectAvatarMenuIsOpen = state => state.avatarMenu.isOpen;

export default avatarMenuSlice.reducer;
