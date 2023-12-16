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
            console.log(error)
        }
    }
);

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

export const replySlice = createSlice(
    {
        name: 'reply',
        initialState,
        reducers: {},
        extraReducers: {
            [createReply.pending]: (state) => {
                state.loading = true;
            },
            [createReply.fulfilled]: (state, action) => {
                state.loading = false;
                state.replies.push(action.payload);
            },
            [createReply.rejected]: (state) => {
                state.loading = false;
            }
        },
    }
);

export default replySlice.reducer;