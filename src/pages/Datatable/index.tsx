import React, { useState } from 'react';
import style from './index.module.scss';
import Button from '../../components/main-Page-Components/button/Button';
import UserAdd from '../../components/Datatable-Page-Components/modalUserAdd/UserAdd';

import UserDataTable from './UserDataTable/UserDataTable';
import UserProfile from './UserProfile/UserProfile';
import { useAppSelector } from '../../__data/hooks/redux';

function DataTable() {
    const [showUserCreationWindow, setShowUserCreationWindow] = useState(false);
    const { allUsersList } = useAppSelector((state) => state.dataTable);
    const { activeUser } = useAppSelector((state) => state.dataTable);
    const [serchfieldText, setSearchfieldText] = useState('');

    const searchFilter = (serchfieldText: string) => {
        const lowerCaseText = serchfieldText.toLowerCase();
    };

    const handleClickSearch = () => {
        return;
    };

    const handleClickClear = () => {
        return;
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
                    <UserDataTable />
                    {activeUser?.id && <UserProfile />}
                </section>
            </div>

            {showUserCreationWindow && (
                <UserAdd
                    showUserCreationWindow={showUserCreationWindow}
                    setShowUserCreationWindow={setShowUserCreationWindow}
                />
            )}
        </div>
    );
}

export default DataTable;
