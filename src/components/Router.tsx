import { Navigate, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import DataTable from '../pages/Datatable';

export const Router = () => {
    return (
        <Routes>
            <Route path='/main' element={<Main />} />
            <Route path='/userdata' element={<DataTable />} />
            <Route path='*' element={<Navigate to={'/main'} replace />} />
        </Routes>
    );
};
