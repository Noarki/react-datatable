import React from 'react';
import Button from '../../../../components/main-Page-Components/button/Button';
import style from './Pagination.module.scss';

interface IProps {
    usersPerPageNumber: number;
    totalUserNumber: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<IProps> = ({ usersPerPageNumber, totalUserNumber, paginate, currentPage }) => {
    const pageSwitcherBtnNames: string[] = [];
    let i = 1;

    while (totalUserNumber / usersPerPageNumber >= i) {
        pageSwitcherBtnNames.push(String(i));
        i++;
    }

    const handlePageSwitch = (btnValue: string) => {
        paginate(Number(btnValue));
    };

    const renderBtnsArray = (optimizedPageSwitcherBtnNames: string[]) => {
        return optimizedPageSwitcherBtnNames.map((btnValue: string) => (
            <div className={style.paginationBtnsWrapper}>
                <Button className={style.pageSwitchBtn} onClick={() => handlePageSwitch(btnValue)}>
                    {btnValue}
                </Button>
            </div>
        ));
    };

    const renderOptimizedBtn = () => {
        if (pageSwitcherBtnNames.length > 5 && currentPage > 3) {
            let optimizedPageSwitcherBtnNames = pageSwitcherBtnNames.slice(currentPage - 3, currentPage + 2);
            // return optimizedPageSwitcherBtnNames.map((btnValue: string) => (
            //     <div className={style.paginationBtnsWrapper}>
            //         <Button className={style.pageSwitchBtn} onClick={() => handlePageSwitch(btnValue)}>
            //             {btnValue}
            //         </Button>
            //     </div>
            // ));
            return renderBtnsArray(optimizedPageSwitcherBtnNames);
        } else if (pageSwitcherBtnNames.length > 5) {
            let optimizedPageSwitcherBtnNames = pageSwitcherBtnNames.slice(0, currentPage + 2);

            // return optimizedPageSwitcherBtnNames.map((btnValue: string) => (
            //     <div className={style.paginationBtnsWrapper}>
            //         <Button className={style.pageSwitchBtn} onClick={() => handlePageSwitch(btnValue)}>
            //             {btnValue}
            //         </Button>
            //     </div>
            // ));

            return renderBtnsArray(optimizedPageSwitcherBtnNames);
        } else {
            // return pageSwitcherBtnNames.map((btnValue: string) => (
            //     <div className={style.paginationBtnsWrapper}>
            //         <Button className={style.pageSwitchBtn} onClick={() => handlePageSwitch(btnValue)}>
            //             {btnValue}
            //         </Button>
            //     </div>
            // ));
            return renderBtnsArray(pageSwitcherBtnNames);
        }
    };

    return <div className={style.paginationWrapper}>{renderOptimizedBtn()}</div>;
};

export default Pagination;
