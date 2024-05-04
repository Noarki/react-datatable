import React, { useEffect, useState } from 'react';
import style from './index.module.scss';
import Button from '../../components/main-Page-Components/button/Button';
import UserAdd from '../../components/Datatable-Page-Components/modalUserAdd/UserAdd';

import UserDataTable from './UserDataTable/UserDataTable';
import UserProfile from './UserProfile/UserProfile';
import { useAppDispatch, useAppSelector } from '../../__data/hooks/redux';
import { IuserData } from '../../__data/models/dataTable';
import { userSlice } from '../../__data/store/redusers/dataTableReducer';

function DataTable() {
    const dispatch = useAppDispatch();
    const [showUserCreationWindow, setShowUserCreationWindow] = useState(false);
    const [searchResults, setSearchResults] = useState<IuserData[]>([]);
    const { activeUser, allUsersList } = useAppSelector((state) => state.dataTable);
    const [serchfieldText, setSearchfieldText] = useState('');

    const [baseArray, setBaseArray] = useState([...allUsersList]);

    // 0 - нет фильтра, 1 - фильтр по возрастанию, 2 - фильтр по убыванию
    const [filtrationTypeId, setFiltrationTypeId] = useState(1); // ASC - фильтр по возрастанию  DESC - фильтр по убыванию NONE - Без фильтра
    const [filtrationTypeName, setFiltrationTypeName] = useState(1);
    const [filtrationTypeSurname, setFiltrationTypeSurname] = useState(1);
    const [filtrationTypeMail, setFiltrationTypeMail] = useState(1);

    useEffect(() => {
        setBaseArray([...allUsersList]);
    }, []);

    useEffect(() => {
        searchData();
    }, [allUsersList]);

    const searchData = () => {
        const lowerCaseText = serchfieldText.toLowerCase();
        const result = allUsersList.filter(
            (dataObject) =>
                String(dataObject.id) === lowerCaseText ||
                dataObject.firstName.toLowerCase().includes(lowerCaseText) ||
                dataObject.lastName.toLowerCase().includes(lowerCaseText) ||
                dataObject.email.toLowerCase().includes(lowerCaseText)
        );

        setSearchResults(result);
    };

    const handleClickSearch = () => {
        searchData();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleClickSearch();
        }
    };

    const handleClickClear = () => {
        dispatch(userSlice.actions.filterUserDatatable(baseArray));
        setFiltrationTypeId(1);
        setFiltrationTypeName(1);
        setFiltrationTypeSurname(1);
        setFiltrationTypeMail(1);
    };

    const handleSearchfieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchfieldText(event.target.value);
    };

    const handleClickUserAdd = () => {
        setShowUserCreationWindow(!showUserCreationWindow);
    };

    return (
        <div className={style.mainWrapper}>
            <div className={style.innerWrapper}>
                <p className={style.headerText}> Amazing User data table</p>
                <hr className={style.decorationLine}></hr>
                <p className={style.searchHeaderText}> Find user you need </p>
                <div className={style.searchFieldWrapper}>
                    <input
                        className={style.searchField}
                        value={serchfieldText}
                        placeholder={'Search user'}
                        onChange={handleSearchfieldChange}
                        onKeyDown={handleKeyDown}
                    ></input>
                    <div className={style.BtnWrapper}>
                        <Button className={style.searchBtn} onClick={handleClickSearch}>
                            Search
                        </Button>
                        <Button className={style.clearBtn} onClick={handleClickClear}>
                            Clear
                        </Button>
                    </div>
                </div>
                <Button className={style.addBtn} onClick={handleClickUserAdd}>
                    Add new user
                </Button>
                <section className={style.InfoSectionWrapper}>
                    <UserDataTable
                        filtrationTypeId={filtrationTypeId}
                        filtrationTypeName={filtrationTypeName}
                        filtrationTypeSurname={filtrationTypeSurname}
                        filtrationTypeMail={filtrationTypeMail}
                        setFiltrationTypeId={setFiltrationTypeId}
                        setFiltrationTypeName={setFiltrationTypeName}
                        setFiltrationTypeSurname={setFiltrationTypeSurname}
                        setFiltrationTypeMail={setFiltrationTypeMail}
                        searchResults={searchResults}
                        baseArray={baseArray}
                        setBaseArray={setBaseArray}
                    />
                    {Boolean(activeUser?.id) && <UserProfile />}
                </section>
            </div>

            {showUserCreationWindow && (
                <UserAdd
                    showUserCreationWindow={showUserCreationWindow}
                    setShowUserCreationWindow={setShowUserCreationWindow}
                    baseArray={baseArray}
                    setBaseArray={setBaseArray}
                />
            )}
        </div>
    );
}

export default DataTable;
