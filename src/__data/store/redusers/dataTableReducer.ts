import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdataTable, IuserData } from '../../models/dataTable';

const initialState: IdataTable = {
    allUsersList: [],
    activeUser: {
        id: NaN,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        description: '',
        address: {
            city: '',
            state: '',
            streetAddress: '',
            zip: NaN,
        },
    },
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
        setActiveUser(state, action: PayloadAction<IuserData>) {
            return {
                ...state,
                activeUser: action.payload,
            };
        },
        filterUserDatatable(state, action: PayloadAction<IuserData[]>) {
            return {
                ...state,
                allUsersList: action.payload,
            };
        },
    },
});

export default userSlice.reducer;
