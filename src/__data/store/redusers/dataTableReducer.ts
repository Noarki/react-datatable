import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Eorder, IdataTable, IuserData } from '../../models/dataTable';

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
    filtrationType: Eorder.ASC,
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
        addFormUserData(state, action: PayloadAction<IuserData>) {
            return {
                ...state,
                allUsersList: [action.payload, ...state.allUsersList],
            };
        },
        changeFiltration(state) {
            if (state.filtrationType !== Eorder.DESC) {
                return {
                    ...state,
                    filtrationType: state.filtrationType + 1,
                };
            } else if (state.filtrationType === Eorder.DESC) {
                return {
                    ...state,
                    filtrationType: Eorder.NONE,
                };
            }
        },
        resetFiltration(state) {
            return {
                ...state,
                FiltrationType: Eorder.NONE,
            };
        },
    },
});

export default userSlice.reducer;
