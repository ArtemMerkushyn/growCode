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
            const { data } = await axios.post('/queries', { question, text, topic });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getAllQueries = createAsyncThunk(
    'query/getAllQueries',
    async () => {
        try {
            const { data } = await axios.get('/queries');
            return data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const getMyQueries = createAsyncThunk(
    'query/getMyQueries',
    async () => {
        try {
            const { data } = await axios.get('/queries/user/me');
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateQuery = createAsyncThunk(
    'query/updateQuery',
    async ({ id, updatedQuery }) => {
        try {
            const { data } = await axios.put(`/queries/${id}`, updatedQuery);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteQuery = createAsyncThunk(
    'query/deleteQuery',
    async (id) => {
        try {
            const { data } = await axios.delete(`/queries/${id}`);
            return data;
        } catch (error) {
            console.log(error);
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
            state.queries.push(action.payload);
            //state.queries = Array.isArray(state.queries) ? [...state.queries, action.payload] : [action.payload];
            //state.status = action.payload.message;
        },
        [createQuery.rejected]: (state, action) => {
            state.loading = false;
            state.status = action.payload.message;
        },
        // receiving all queries
        [getAllQueries.pending]: (state) => {
            state.loading = true;
        },
        [getAllQueries.fulfilled]: (state, action) => {
            state.loading = false;
            state.queries = action.payload.queries;
        },
        [getAllQueries.rejected]: (state) => {
            state.loading = false;
        },
        // get my queries
        [getMyQueries.pending]: (state) => {
            state.loading = true;
        },
        [getMyQueries.fulfilled]: (state, action) => {
            state.loading = false;
            state.queries = action.payload;
        },
        [getMyQueries.rejected]: (state) => {
            state.loading = false;
        },
        // update query
        [updateQuery.pending]: (state) => {
            state.loading = true;
        },
        [updateQuery.fulfilled]: (state, action) => {
            state.loading = false;
            const index = state.queries.findIndex(query => query.id === action.payload.id);
            if (index !== -1) {
                state.queries[index].imgUrl = action.payload.question;
                state.queries[index].title = action.payload.text;
                state.queries[index].text = action.payload.topic;
            }
        },
        [updateQuery.rejected]: (state) => {
            state.loading = false;
        },
        [deleteQuery.pending]: (state) => {
            state.loading = true;
        },
        [deleteQuery.fulfilled]: (state, action) => {
            state.loading = false;
            if(action.payload && action.payload._id) {
                state.queries = state.queries.filter(
                    (query) => query._id !== action.payload._id,
                );
            }
        },
        [deleteQuery.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default querySlice.reducer;