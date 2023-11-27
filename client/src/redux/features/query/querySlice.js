import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
    queries: [],
    loading: false,
    status: null,
}

export const createQuery = createAsyncThunk(
    'query/createQuery',
    async ({ question, text, topic }) => {
        try {
            const { data } = axios.post('/queries', { question, text, topic });
            return data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {},
    extraReducers: {
        // create query
        [createQuery.pending]: (state) => {
            state.loading = true;
        },
        [createQuery.fulfilled]: (state, action) => {
            state.loading = false;
            //state.queries.push(action.payload);
            state.queries = Array.isArray(state.queries) ? [...state.queries, action.payload] : [action.payload];
            //state.status = action.payload.message;
        },
        [createQuery.rejected]: (state, action) => {
            state.loading = false;
            state.status = action.payload.message;
        },
    },
});

export default querySlice.reducer;