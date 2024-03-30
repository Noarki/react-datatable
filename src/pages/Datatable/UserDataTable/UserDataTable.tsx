import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../__data/hooks/redux';
import { IuserData } from '../../../__data/models/dataTable';
import Pagination from './Pagination/Pagination';
import style from './UserDataTable.module.scss';
import { userSlice } from '../../../__data/store/redusers/dataTableReducer';

interface IProps {
    searchResults: IuserData[];
}

const UserDataTable: React.FC<IProps> = ({ searchResults }) => {
    const { allUsersList } = useAppSelector((state) => state.dataTable);
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPageNumber] = useState(10);

    // 0 - нет фильтра, 1 - фильтр по возрастанию, 2 - фильтр по убыванию
    const [filtrationTypeId, setFiltrationTypeId] = useState(0);
    const [filtrationTypeName, setFiltrationTypeName] = useState(0);
    const [filtrationTypeSurname, setFiltrationTypeSurname] = useState(0);
    const [filtrationTypeMail, setFiltrationTypeMail] = useState(0);

    const lastOnPageIndex = usersPerPageNumber * currentPage;
    const firstOnPageIndex = lastOnPageIndex - usersPerPageNumber;
    const currentPageData = allUsersList.slice(firstOnPageIndex, lastOnPageIndex);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const renderData = (data: IuserData[]) => {
        return (
            <div className={style.table}>
                {data.map((value: IuserData, index: number) => (
                    <div
                        className={index % 2 === 0 ? style.TableRow_odd : style.TableRow_even}
                        onClick={() => handleSetActiveProfile(value)}
                    >
                        <div className={`${style.TableCell} ${style.idCell}`}>
                            <p className={style.tableText}>{value.id}</p>
                        </div>
                        <div className={`${style.TableCell} ${style.firstNameCell}`}>
                            <p className={style.tableText}>{value.firstName}</p>
                        </div>
                        <div className={`${style.TableCell} ${style.LastNameCell}`}>
                            <p className={style.tableText}>{value.lastName}</p>
                        </div>
                        <div className={`${style.TableCell} ${style.EmailCell}`}>
                            <p className={style.tableText}>{value.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const SetterChange = (state: number, setter: React.Dispatch<React.SetStateAction<number>>) => {
        if (state === 0 || state === 1) {
            setter(state + 1);
            console.log(state);
        } else {
            setter(0);
            console.log(state);
        }
    };

    const filtration = (SortType: number) => {
        if (SortType === 1) {
            let arrayForSort = [...allUsersList];

            console.log(arrayForSort);

            // const sortedUserList = arrayForSort.sort();

            const sortedUserList = arrayForSort.sort((user1, user2) => (user1.id > user2.id ? 1 : -1));

            console.log(sortedUserList);

            dispatch(userSlice.actions.filterUserDatatable(sortedUserList));

            console.log(sortedUserList);
            return sortedUserList;
        } else if (SortType === 2) {
            let sortedUserList = allUsersList;

            console.log(sortedUserList);
            sortedUserList.sort((user1, user2) => (user1['id'] < user2['id'] ? 1 : -1));

            console.log(sortedUserList);
        }
    };

    const handleFilterChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        switch (event.currentTarget.id) {
            case 'UserId':
                SetterChange(filtrationTypeId, setFiltrationTypeId);
                filtration(filtrationTypeId);
                break;
            case 'UserName':
                SetterChange(filtrationTypeName, setFiltrationTypeName);
                break;
            case 'UserSurname':
                SetterChange(filtrationTypeSurname, setFiltrationTypeSurname);
                break;
            case 'UserMail':
                SetterChange(filtrationTypeMail, setFiltrationTypeMail);
                break;
            default:
                break;
        }
    };

    const handleSetActiveProfile = (userData: IuserData) => {
        dispatch(userSlice.actions.setActiveUser(userData));
    };

    return (
        <div className={style.datatableMainWrapper}>
            <div className={style.headerTableRow}>
                <div
                    className={`${style.headerTableCell} ${style.idCell}`}
                    onClick={handleFilterChange}
                    id={'UserId'}
                >
                    <p className={style.tableHeaderText}>ID</p>
                </div>
                <div
                    className={`${style.headerTableCell} ${style.firstNameCell}`}
                    onClick={handleFilterChange}
                    id={'UserName'}
                >
                    <p className={style.tableHeaderText}>Name</p>
                </div>
                <div
                    className={`${style.headerTableCell} ${style.LastNameCell}`}
                    onClick={handleFilterChange}
                    id={'UserSurname'}
                >
                    <p className={style.tableHeaderText}>Surname</p>
                </div>
                <div
                    className={`${style.headerTableCell} ${style.EmailCell}`}
                    onClick={handleFilterChange}
                    id={'UserMail'}
                >
                    <p className={style.tableHeaderText}>email</p>
                </div>
            </div>

            {searchResults.length > 0
                ? renderData(searchResults.slice(firstOnPageIndex, lastOnPageIndex))
                : renderData(currentPageData)}

            <Pagination
                usersPerPageNumber={usersPerPageNumber}
                totalUserNumber={allUsersList.length}
                paginate={paginate}
                currentPage={currentPage}
                searchResults={searchResults}
            />
        </div>
    );
};

export default UserDataTable;
