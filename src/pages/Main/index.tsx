import { useState } from 'react';
import Button from '../../components/main-Page-Components/button/Button';
import Loading from '../../components/main-Page-Components/loadingAnimation/Loading';
import style from './index.module.scss';

function Main() {
    const [displayLoadingAnimation, setDisplayLoadingAnimation] = useState(false);

    const handleClickShortList = () => {
        setDisplayLoadingAnimation(true);
        setTimeout(() => {
            setDisplayLoadingAnimation(false);
        }, 7000);
    };

    const handleClickFullList = () => {
        setDisplayLoadingAnimation(true);
        setTimeout(() => {
            setDisplayLoadingAnimation(false);
        }, 7000);
    };

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
            </div>
            {displayLoadingAnimation && <Loading />}
        </>
    );
}

export default Main;
