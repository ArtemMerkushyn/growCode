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

export const getMyPosts = createAsyncThunk(
    'post/getMyPosts',
    async () => {
        try {
            const { data } = await axios.get('/posts/user/me');
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async ({ id, updatedPost  }) => {
        try {
            const { data } = await axios.put(`/posts/${id}`, updatedPost);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const removePost = createAsyncThunk(
    'post/removePost',
    async (id) => {
        try {
            const { data } = await axios.delete(`/posts/${id}`);
            return data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const getAllPosts = createAsyncThunk(
    'post/getAllPosts',
    async () => {
        try {
            const { data } = await axios.get('/posts');
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
        // receiving all posts
        [getAllPosts.pending]: (state) => {
            state.loading = true;
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload.posts;
            state.popularPosts = action.payload.popularPosts;
        },
        [getAllPosts.rejected]: (state) => {
            state.loading = false;
        },
        // get user posts
        [getMyPosts.pending]: (state) => {
            state.loading = true;
        },
        [getMyPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            //state.popularPosts = action.payload.popularPosts;
        },
        [getMyPosts.rejected]: (state) => {
            state.loading = false;
        },
        // update post
        [updatePost.pending]: (state) => {
            state.loading = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false;
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index].imgUrl = action.payload.imgUrl;
                state.posts[index].title = action.payload.title;
                state.posts[index].text = action.payload.text;
            }
        },
        [updatePost.rejected]: (state) => {
            state.loading = false;
        },
        // remove post
        [removePost.pending]: (state) => {
            state.loading = true;
        },
        [removePost.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload && action.payload._id) {
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload._id,
                );
                state.popularPosts = state.popularPosts.filter(
                    (post) => post._id !== action.payload._id,
                );
            }
        },
        [removePost.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default postSlice.reducer;