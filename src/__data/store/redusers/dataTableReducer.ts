import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EOrder, IDataTable, IUserData } from '../../models/dataTable';

const initialState: IDataTable = {
    allUsersList: [],
    loading: false,
    error: false,
    filtrationType: EOrder.ASC,
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
        fetchDataSuccess(state, action: PayloadAction<IUserData[]>) {
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
        setActiveUser(state, action: PayloadAction<IUserData>) {
            return {
                ...state,
                activeUser: action.payload,
            };
        },
        filterUserDatatable(state, action: PayloadAction<IUserData[]>) {
            return {
                ...state,
                allUsersList: action.payload,
            };
        },
        addFormUserData(state, action: PayloadAction<IUserData>) {
            return {
                ...state,
                allUsersList: [action.payload, ...state.allUsersList],
            };
        },
        changeFiltration(state) {
            if (state.filtrationType !== EOrder.DESC) {
                return {
                    ...state,
                    filtrationType: state.filtrationType + 1,
                };
            } else if (state.filtrationType === EOrder.DESC) {
                return {
                    ...state,
                    filtrationType: EOrder.NONE,
                };
            }
        },
        resetFiltration(state) {
            return {
                ...state,
                filtrationType: EOrder.NONE,
            };
        },
    },
});

export default userSlice.reducer;
