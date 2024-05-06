import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../__data/hooks/redux';
import { EOrder, IUserData } from '../../../__data/models/dataTable';
import Pagination from './Pagination/Pagination';
import style from './UserDataTable.module.scss';
import { userSlice } from '../../../__data/store/redusers/dataTableReducer';
import { countPageQuantity } from './utils';

interface IProps {
    searchResults: IUserData[];
    baseArray: IUserData[];
}

const UserDataTable: React.FC<IProps> = ({ searchResults, baseArray }) => {
    const { allUsersList, filtrationType } = useAppSelector((state) => state.dataTable);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPageNumber] = useState(10);
    const [arrayForSort, setArrayForSort] = useState<IUserData[]>([...baseArray]);
    const [pageSwitcherBtnNames, setPageSwitcherBtnNames] = useState<string[]>(
        countPageQuantity(allUsersList, usersPerPageNumber)
    );
    const [pageSwitcherSearchedBtnNames, setPageSwitcherSearchdBtnNames] = useState<string[]>(
        countPageQuantity(searchResults, usersPerPageNumber)
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        setPageSwitcherBtnNames(countPageQuantity(allUsersList, usersPerPageNumber));
    }, [allUsersList]);

    useEffect(() => {
        setPageSwitcherSearchdBtnNames(countPageQuantity(searchResults, usersPerPageNumber));
    }, [searchResults]);

    useEffect(() => {
        setArrayForSort(baseArray);
    }, [baseArray]);

    const renderData = (data: IUserData[]) => {
        return (
            <div className={style.table}>
                {data.map((value: IUserData, index: number) => (
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

    const handleFilterChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const filtration = (SortType: EOrder, sortParametr: keyof IUserData) => {
            switch (SortType) {
                case EOrder.NONE: {
                    dispatch(userSlice.actions.filterUserDatatable(baseArray));
                    break;
                }
                case EOrder.ASC: {
                    const sortedUserList = [...arrayForSort].sort((user1, user2) =>
                        user1[sortParametr] > user2[sortParametr] ? 1 : -1
                    );
                    setArrayForSort(sortedUserList);

                    dispatch(userSlice.actions.filterUserDatatable(sortedUserList));

                    break;
                }
                case EOrder.DESC: {
                    const sortedUserList = [...arrayForSort].sort((user1, user2) =>
                        user1[sortParametr] < user2[sortParametr] ? 1 : -1
                    );
                    setArrayForSort(sortedUserList);
                    dispatch(userSlice.actions.filterUserDatatable(sortedUserList));
                    break;
                }

                default:
                    break;
            }
        };

        switch (event.currentTarget.id) {
            case 'UserId':
                dispatch(userSlice.actions.changeFiltration());
                filtration(filtrationType, 'id');
                break;
            case 'UserName':
                dispatch(userSlice.actions.changeFiltration());
                filtration(filtrationType, 'firstName');
                break;
            case 'UserSurname':
                dispatch(userSlice.actions.changeFiltration());
                filtration(filtrationType, 'lastName');
                break;
            case 'UserMail':
                dispatch(userSlice.actions.changeFiltration());
                filtration(filtrationType, 'email');
                break;
            default:
                break;
        }
    };

    const handleSetActiveProfile = (userData: IUserData) => {
        dispatch(userSlice.actions.setActiveUser(userData));
    };

    const lastOnPageIndex = usersPerPageNumber * currentPage;
    const firstOnPageIndex = lastOnPageIndex - usersPerPageNumber;
    const currentPageData = allUsersList.slice(firstOnPageIndex, lastOnPageIndex);

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
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                searchResults={searchResults}
                pageSwitcherBtnNames={pageSwitcherBtnNames}
                pageSwitcherSearchedBtnNames={pageSwitcherSearchedBtnNames}
            />
        </div>
    );
};

export default UserDataTable;
