import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
    replies: [],
    loading: false,
}

export const createReply = createAsyncThunk(
    'reply/createReply',
    async ({ queryId, reply }) => {
        try {
            const { data } = await axios.post(`/replies/${queryId}`, { queryId, reply });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteReply = createAsyncThunk(
    'reply/deleteReply',
    async ({ replyId }) => {
        try {
            const { data } = await axios.delete(`/replies/${replyId}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getQueryReplies = createAsyncThunk(
    'reply/getQueryReplies',
    async (queryId) => {
        try {
            const { data } = await axios.get(`/queries/${queryId}/replies`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateReply = createAsyncThunk(
    'reply/updateReply',
    async ({ id, replyText }) => {
        try {
            const { data } = await axios.put(`/replies/${id}`, { replyText });
            console.log(replyText)
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const replySlice = createSlice(
    {
        name: 'reply',
        initialState,
        reducers: {},
        extraReducers: {
            // create reply
            [createReply.pending]: (state) => {
                state.loading = true;
            },
            [createReply.fulfilled]: (state, action) => {
                state.loading = false;
                state.replies.push(action.payload);
            },
            [createReply.rejected]: (state) => {
                state.loading = false;
            },
            // get query replies
            [getQueryReplies.pending]: (state) => {
                state.loading = true;
            },
            [getQueryReplies.fulfilled]: (state, action) => {
                state.loading = false;
                state.replies = action.payload;
            },
            [getQueryReplies.rejected]: (state) => {
                state.loading = false;
            },
            // update reply
            [updateReply.pending]: (state) => {
                state.loading = true;
            },
            [updateReply.fulfilled]: (state, action) => {
                state.loading = false;
                const index = state.replies.findIndex(reply => reply.id === action.payload.id);
                if(index !==  -1) state.replies[index].reply = action.payload.reply;
            },
            [updateReply.rejected]: (state) => {
                state.loading = false;
            },
            //delete reply
            [deleteReply.pending]: (state) => {
                state.loading = true;
            },
            [deleteReply.fulfilled]: (state, action) => {
                state.loading = false;
                const idToRemove = action.payload.reply._id;
                //const idToRemove = action.payload?.reply?._id;
                state.replies = state.replies.filter(reply => reply._id !== idToRemove);
            },
            [deleteReply.rejected]: (state) => {
                state.loading = false;
            },
        },
    }
);

export default replySlice.reducer;