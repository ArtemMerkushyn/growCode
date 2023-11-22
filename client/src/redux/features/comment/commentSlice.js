import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
    comments: [],
    allComments: [],
    loading: false,
}

export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({ postId, comment }) => {
        try {
            const { data } = await axios.post(`/comments/${postId}`, { 
                postId, 
                comment,
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const removeComment = createAsyncThunk(
    'comment/removePost',
    async ({ commentId, postId }) => {
        try {
            const { data } = await axios.delete(`/comments/${commentId}`, commentId, postId);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getPostComments = createAsyncThunk(
    'comment/getPostComments',
    async (postId) => {
        try {
            const { data } = await axios.get(`/posts/comments/${postId}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getAllComments = createAsyncThunk(
    'comment/getAllComments',
    async () => {
        try {
            const { data } = await axios.get('/comments');
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const commentSlice = createSlice(
    {
        name: 'comment',
        initialState,
        reducers: {},
        extraReducers: {
            // create comment
            [createComment.pending]: (state) => {
                state.loading = true;
            },
            [createComment.fulfilled]: (state, action) => {
                state.loading = false;
                state.comments.push(action.payload);
            },
            [createComment.rejected]: (state) => {
                state.loading = false;
            },
            // remove comment
            [removeComment.pending]: (state) => {
                state.loading = true;
            },
            [removeComment.fulfilled]: (state, action) => {
                state.loading = false;
                state.comments = state.comments.filter(
                    (comment) => comment._id !== action.payload._id,
                );
            },
            [removeComment.rejected]: (state) => {
                state.loading = false;
            },
            // get post comments
            [getPostComments.pending]: (state) => {
                state.loading = true;
            },
            [getPostComments.fulfilled]: (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            },
            [getPostComments.rejected]: (state) => {
                state.loading = false;
            },
            // receiving all comments
            [getAllComments.pending]: (state) => {
                state.loading = true;
            },
            [getAllComments.fulfilled]: (state, action) => {
                state.loading = false;
                state.allComments = action.payload.comments;
            },
            [getAllComments.rejected]: (state) => {
                state.loading = false;
            },
        },
    }
);

export default commentSlice.reducer;