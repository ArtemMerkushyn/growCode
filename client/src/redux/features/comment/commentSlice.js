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

//update comment
export const updateComment = createAsyncThunk(
    'comment/updateComment',
    async ({ id, updatedComment }) => {
        try {
            const data = axios.put(`/comments/${id}`, updatedComment);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const removeComment = createAsyncThunk(
    'comment/removePost',
    async ( {commentId} ) => {
        try {
            const { data } = await axios.delete(`/comments/${commentId}`);
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
            // update comment
            [updateComment.pending]: (state) => {
                state.loading = true;
            },
            [updateComment.fulfilled]: (state, action) => {
                state.loading = false;
                const index = state.comments.findIndex(comment => comment.id === action.payload.id);
                if(index !==  -1) state.comments[index].comment = action.payload.comment;
            },
            [updateComment.rejected]: (state) => {
                state.loading = false;
            },
            // remove comment
            [removeComment.pending]: (state) => {
                state.loading = true;
            },
            [removeComment.fulfilled]: (state, action) => {
                state.loading = false;
                const idToRemove = action.payload.comment._id;
                state.comments = state.comments.filter(comment => comment._id !== idToRemove);
                state.allComments = state.allComments.filter(comment => comment._id !== idToRemove);
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