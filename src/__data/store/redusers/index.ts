import { combineReducers } from '@reduxjs/toolkit';
import dataTable from './dataTableReducer';

export const rootReducer = combineReducers({
    dataTable,
});
