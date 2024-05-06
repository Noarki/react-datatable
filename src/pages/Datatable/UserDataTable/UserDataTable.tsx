import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../__data/hooks/redux';
import { Eorder, IuserData } from '../../../__data/models/dataTable';
import Pagination from './Pagination/Pagination';
import style from './UserDataTable.module.scss';
import { userSlice } from '../../../__data/store/redusers/dataTableReducer';

interface IProps {
    searchResults: IuserData[];

    baseArray: IuserData[];
    setBaseArray: (x: IuserData[]) => void;
}

const UserDataTable: React.FC<IProps> = ({
    searchResults,

    baseArray,
}) => {
    const { allUsersList, filtrationType } = useAppSelector((state) => state.dataTable);
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPageNumber] = useState(10);

    const [arrayForSort, setArrayForSort] = useState<IuserData[]>([...baseArray]);

    const lastOnPageIndex = usersPerPageNumber * currentPage;
    const firstOnPageIndex = lastOnPageIndex - usersPerPageNumber;
    const currentPageData = allUsersList.slice(firstOnPageIndex, lastOnPageIndex);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const countPageQuantity = (arr: IuserData[]) => {
        let pageQuantity = Math.ceil(arr.length / usersPerPageNumber);
        let emptyArr = [];

        for (let i = 1; i <= pageQuantity; i++) {
            emptyArr.push(String(i));
        }

        return emptyArr;
    };

    const [pageSwitcherBtnNames, setPageSwitcherBtnNames] = useState<string[]>(
        countPageQuantity(allUsersList)
    );
    const [pageSwitcherSearchedBtnNames, setPageSwitcherSearchdBtnNames] = useState<string[]>(
        countPageQuantity(searchResults)
    );

    useEffect(() => setPageSwitcherBtnNames(countPageQuantity(allUsersList)), [allUsersList]);
    useEffect(() => setPageSwitcherSearchdBtnNames(countPageQuantity(searchResults)), [searchResults]);

    useEffect(() => {
        setArrayForSort(baseArray);
    }, [baseArray]);

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

    const filtration = (SortType: Eorder, sortParametr: keyof IuserData) => {
        switch (SortType) {
            case Eorder.NONE: {
                dispatch(userSlice.actions.filterUserDatatable(baseArray));
                break;
            }
            case Eorder.ASC: {
                const sortedUserList = [...arrayForSort].sort((user1, user2) =>
                    user1[sortParametr] > user2[sortParametr] ? 1 : -1
                );
                setArrayForSort(sortedUserList);

                dispatch(userSlice.actions.filterUserDatatable(sortedUserList));

                break;
            }
            case Eorder.DESC: {
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

    //     switch (event.currentTarget.id) {
    //         case 'UserId':
    //             setFiltrationTypeName(1);
    //             setFiltrationTypeSurname(1);
    //             setFiltrationTypeMail(1);
    //             SetterChange(filtrationTypeId, setFiltrationTypeId);
    //             filtration(filtrationTypeId, 'id');
    //             break;
    //         case 'UserName':
    //             setFiltrationTypeId(1);
    //             setFiltrationTypeSurname(1);
    //             setFiltrationTypeMail(1);
    //             SetterChange(filtrationTypeName, setFiltrationTypeName);
    //             filtration(filtrationTypeName, 'firstName');
    //             break;
    //         case 'UserSurname':
    //             setFiltrationTypeId(1);
    //             setFiltrationTypeName(1);
    //             setFiltrationTypeMail(1);
    //             SetterChange(filtrationTypeSurname, setFiltrationTypeSurname);
    //             filtration(filtrationTypeSurname, 'lastName');
    //             break;
    //         case 'UserMail':
    //             setFiltrationTypeId(1);
    //             setFiltrationTypeName(1);
    //             setFiltrationTypeSurname(1);
    //             SetterChange(filtrationTypeMail, setFiltrationTypeMail);
    //             filtration(filtrationTypeMail, 'email');
    //             break;
    //         default:
    //             break;
    //     }
    // };

    const handleFilterChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
                totalUserNumber={searchResults.length > 0 ? searchResults.length : allUsersList.length}
                paginate={paginate}
                currentPage={currentPage}
                searchResults={searchResults}
                pageSwitcherBtnNames={pageSwitcherBtnNames}
                pageSwitcherSearchedBtnNames={pageSwitcherSearchedBtnNames}
            />
        </div>
    );
};

export default UserDataTable;
