import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IdataTable } from '../../models/dataTable';

const initialState: IdataTable = {
    allUsersList: [],
    status: 'null',
    error: 'null',
};

export const fetchShortUserList = createAsyncThunk('dataTable/fetchShortUserList', async function () {
    const response = await fetch(
        'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
    );
    const data = await response.json();

    return data;
});

export const userSlice = createSlice({
    name: 'dataTable',
    initialState,
    reducers: {
        getShortDataList(state) {
            return {
                ...state,
                allUsersList: [...state.allUsersList],
            };
        },
    },

    // extraReducers: {
    //     [fetchShortUserList.pending]: (state: IdataTable) => {
    //         state.status = 'loading';
    //     },
    //     [fetchShortUserList.fulfilled]: (state: IdataTable, action:PayloadAction<IdataTable>) => {
    //         state.status = 'resolved'
    //         state.allUsersList = action.payload
    //     },
    //     [fetchShortUserList.rejected]: (state, action) => {},
    // },
});

export default userSlice.reducer;
