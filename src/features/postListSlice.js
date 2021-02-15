import { createSlice } from '@reduxjs/toolkit';

export const postListSlice = createSlice({
  name: 'postList',
  initialState: {
    posts : null ,
    newpost: false ,
    
  },
  reducers: {
   addPost : (state,action) => {
     state.posts =  action.payload ;
   },
   clearPost : (state) => {
     state.posts = null ;
   },
   newPost : (state) => {
     state.newpost = !state.newpost ;
   },

  },
});

export const { addPost, clearPost , newPost } = postListSlice.actions;

export const selectMyPostList = state => state.postList.posts;
export const selectNewPost = state => state.postList.newpost;

export default postListSlice.reducer;
