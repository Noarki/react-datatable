import { createSlice } from '@reduxjs/toolkit';
import { IdataTable } from '../../models/dataTable';

const initialState: IdataTable = {
    allUsersList: [],
};

export const chatSlice = createSlice({
    name: 'dataTable',
    initialState,
    reducers: {},
});

export default chatSlice.reducer;
