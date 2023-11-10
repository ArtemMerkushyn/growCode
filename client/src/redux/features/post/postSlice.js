import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false,
    status: null,
}

export const createPost = createAsyncThunk(
    'post/createPost',
    async({ imgUrl, title, text, }) => {
        try {
            const { data } = await axios.post('/posts', {
                imgUrl,
                title,
                text,
            });
            return data;
        } catch (error) {
            console.log(error)
        }
    },
);

export const getUserPosts = createAsyncThunk(
    'post/getUserPosts',
    async () => {
        try {
            const { data } = await axios.get('/posts/user/me');
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        // create post
        [createPost.pending]: (state) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            //state.posts.push(action.payload);
            state.posts = Array.isArray(state.posts) ? [...state.posts, action.payload] : [action.payload];
            state.status = action.payload.message;
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.status = action.payload.message;
        },
        // get user posts
        [getUserPosts.pending]: (state) => {
            state.loading = true;
        },
        [getUserPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            //state.popularPosts = action.payload.popularPosts;
        },
        [getUserPosts.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default postSlice.reducer;