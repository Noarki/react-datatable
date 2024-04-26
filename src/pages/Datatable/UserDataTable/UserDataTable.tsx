import { useEffect, useState } from 'react';
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
    const [baseArray, setBaseArray] = useState([...allUsersList]);

    // 0 - нет фильтра, 1 - фильтр по возрастанию, 2 - фильтр по убыванию
    const [filtrationTypeId, setFiltrationTypeId] = useState(1);
    const [filtrationTypeName, setFiltrationTypeName] = useState(1);
    const [filtrationTypeSurname, setFiltrationTypeSurname] = useState(1);
    const [filtrationTypeMail, setFiltrationTypeMail] = useState(1);

    const [pageSwitcherBtnNames, setPageSwitcherBtnNames] = useState<string[]>([]);

    const lastOnPageIndex = usersPerPageNumber * currentPage;
    const firstOnPageIndex = lastOnPageIndex - usersPerPageNumber;
    const currentPageData = allUsersList.slice(firstOnPageIndex, lastOnPageIndex);
    useEffect(() => setBaseArray(allUsersList), []);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const countPageQuantity = () => {
        console.log('Aboba');

        let pageQuantity = Math.ceil(allUsersList.length / usersPerPageNumber);
        const emptyArr = [];

        for (let i = 1; i <= pageQuantity; i++) {
            emptyArr.push(String(i));
        }

        // if (emptyArr.length > 0) {
        //     while (i  <= pageQuantity) {
        //         emptyArr.push(String(i));
        //         i++;
        //     }
        // }

        setPageSwitcherBtnNames(emptyArr);
    };

    useEffect(countPageQuantity, [allUsersList]);

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
        if (state !== 2) {
            setter(state + 1);
            console.log(state);
        } else if (state === 2) {
            setter(0);
            console.log(state);
        } else {
            console.log('Ошибка');
        }
    };

    const filtration = (SortType: number, sortParametr: keyof IuserData) => {
        switch (SortType) {
            case 0: {
                console.log(baseArray);

                dispatch(userSlice.actions.filterUserDatatable(baseArray));
                break;
            }
            case 1: {
                let arrayForSort = [...baseArray];

                const sortedUserList = arrayForSort.sort((user1, user2) =>
                    user1[sortParametr] > user2[sortParametr] ? 1 : -1
                );
                dispatch(userSlice.actions.filterUserDatatable(sortedUserList));
                break;
            }
            case 2: {
                let arrayForSort = [...baseArray];

                const sortedUserList = arrayForSort.sort((user1, user2) =>
                    user1[sortParametr] < user2[sortParametr] ? 1 : -1
                );
                dispatch(userSlice.actions.filterUserDatatable(sortedUserList));

                break;
            }

            default:
                break;
        }
    };

    const handleFilterChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        switch (event.currentTarget.id) {
            case 'UserId':
                setFiltrationTypeName(1);
                setFiltrationTypeSurname(1);
                setFiltrationTypeMail(1);
                SetterChange(filtrationTypeId, setFiltrationTypeId);
                filtration(filtrationTypeId, 'id');
                break;
            case 'UserName':
                setFiltrationTypeId(1);
                setFiltrationTypeSurname(1);
                setFiltrationTypeMail(1);
                SetterChange(filtrationTypeName, setFiltrationTypeName);
                filtration(filtrationTypeName, 'firstName');
                break;
            case 'UserSurname':
                setFiltrationTypeId(1);
                setFiltrationTypeName(1);
                setFiltrationTypeMail(1);
                SetterChange(filtrationTypeSurname, setFiltrationTypeSurname);
                filtration(filtrationTypeSurname, 'lastName');
                break;
            case 'UserMail':
                setFiltrationTypeId(1);
                setFiltrationTypeName(1);
                setFiltrationTypeSurname(1);
                SetterChange(filtrationTypeMail, setFiltrationTypeMail);
                filtration(filtrationTypeMail, 'email');
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
            />
        </div>
    );
};

export default UserDataTable;
