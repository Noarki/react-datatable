import { useEffect } from 'react';
import Button from '../../components/button/Button';
import Loading from '../../components/loadingAnimation/Loading';
import style from './index.module.scss';
import { useAppDispatch, useAppSelector } from '../../__data/hooks/redux';

import { fetchData } from '../../__data/store/actions/dataTableAction';
import { useNavigate } from 'react-router-dom';

function Main() {
    const { allUsersList, error, loading } = useAppSelector((state) => state.dataTable);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (allUsersList.length > 0) {
            navigate('/userData');
        }
    }, [allUsersList]);

    const handleClickShortList = () => dispatch(fetchData('short'));
    const handleClickFullList = () => dispatch(fetchData('full'));

    return (
        <>
            <div className={style.mainWrapper}>
                <p className={style.headerText}>Welcome to the main page!!</p>
                <div className={style.buttonWrapper}>
                    <Button className={style.btn} onClick={handleClickShortList}>
                        get short datatable
                    </Button>
                    <Button className={style.btn} onClick={handleClickFullList}>
                        get full datatable
                    </Button>
                </div>
                {error && <p className={style.errorText}> Произошла ошибка получения данных! </p>}
            </div>
            {loading && <Loading />}
        </>
    );
}

export default Main;
