import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdataTable, IuserData } from '../../models/dataTable';

const initialState: IdataTable = {
    allUsersList: [],
    loading: false,
    error: false,
};

export const userSlice = createSlice({
    name: 'dataTable',
    initialState,
    reducers: {
        fetchData(state) {
            return {
                ...state,
                loading: true,
                error: false,
            };
        },
        fetchDataSuccess(state, action: PayloadAction<IuserData[]>) {
            return {
                ...state,
                allUsersList: action.payload,
                loading: false,
                error: false,
            };
        },
        fetchDataFailure(state) {
            return {
                ...state,
                error: true,
                loading: false,
            };
        },
    },
});

export default userSlice.reducer;
