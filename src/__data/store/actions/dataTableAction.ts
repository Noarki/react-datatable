import axios from 'axios';
import { userSlice } from '../redusers/dataTableReducer';
import { AppDispatch, AppState } from '../store';
import { IuserData } from '../../models/dataTable';
import { FULL_DATA, SHORT_DATA } from '../.././config/network';

export const displayGetShortDataList = () => (dispatch: AppDispatch, getState: AppState) => {};

export const fetchData = (dataType: 'short' | 'full') => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.fetchData());

        const result = await axios.get<IuserData[]>(dataType === 'short' ? SHORT_DATA : FULL_DATA);

        if (result) {
            return dispatch(userSlice.actions.fetchDataSuccess(result.data));
        }
    } catch (err: any) {
        dispatch(userSlice.actions.fetchDataFailure());
    }
};
