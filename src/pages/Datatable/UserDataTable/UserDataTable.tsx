import { useState } from 'react';
import { useAppSelector } from '../../../__data/hooks/redux';
import { IuserData } from '../../../__data/models/dataTable';
import Pagination from './Pagination/Pagination';
import style from './UserDataTable.module.scss';

interface IProps {}

const UserDataTable: React.FC<IProps> = () => {
    const { allUsersList } = useAppSelector((state) => state.dataTable);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPageNumber] = useState(5);

    const lastOnPageIndex = usersPerPageNumber * currentPage;
    const firstOnPageIndex = lastOnPageIndex - usersPerPageNumber;
    const currentPageData = allUsersList.slice(firstOnPageIndex, lastOnPageIndex);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

            <div>
                {currentPageData.map((value: IuserData) => (
                    <div className={style.TableRow}>
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
            />
        </div>
    );
};

export default UserDataTable;
