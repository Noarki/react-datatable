import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../__data/hooks/redux';
import { IuserData } from '../../../__data/models/dataTable';
import Pagination from './Pagination/Pagination';
import style from './UserDataTable.module.scss';
import dataTableReducer, { userSlice } from '../../../__data/store/redusers/dataTableReducer';

interface IProps {}

const UserDataTable: React.FC<IProps> = () => {
    const { allUsersList } = useAppSelector((state) => state.dataTable);
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPageNumber] = useState(10);

    const lastOnPageIndex = usersPerPageNumber * currentPage;
    const firstOnPageIndex = lastOnPageIndex - usersPerPageNumber;
    const currentPageData = allUsersList.slice(firstOnPageIndex, lastOnPageIndex);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleSetActiveProfile = (userData: IuserData) => {
        dispatch(userSlice.actions.setActiveUser(userData));
    };

    return (
        <div className={style.datatableMainWrapper}>
            <div className={style.headerTableRow}>
                <div className={style.headerTableCell}>
                    <p className={style.tableHeaderText}>ID</p>
                </div>
                <div className={style.headerTableCell}>
                    <p className={style.tableHeaderText}>Name</p>
                </div>
                <div className={style.headerTableCell}>
                    <p className={style.tableHeaderText}>Surname</p>
                </div>
                <div className={style.headerTableCell}>
                    <p className={style.tableHeaderText}>email</p>
                </div>
            </div>

            <div className={style.table}>
                {currentPageData.map((value: IuserData, index: number) => (
                    <div
                        className={index % 2 === 0 ? style.TableRow_odd : style.TableRow_even}
                        onClick={() => handleSetActiveProfile(value)}
                    >
                        <div className={style.TableCell}>
                            <p className={style.tableText}>{value.id}</p>
                        </div>
                        <div className={style.TableCell}>
                            <p className={style.tableText}>{value.firstName}</p>
                        </div>
                        <div className={style.TableCell}>
                            <p className={style.tableText}>{value.lastName}</p>
                        </div>
                        <div className={style.TableCell}>
                            <p className={style.tableText}>{value.email}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                usersPerPageNumber={usersPerPageNumber}
                totalUserNumber={allUsersList.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default UserDataTable;
