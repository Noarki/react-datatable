import React from 'react';
import Button from '../../../../components/main-Page-Components/button/Button';
import style from './Pagination.module.scss';

interface IProps {
    usersPerPageNumber: number;
    totalUserNumber: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<IProps> = ({ usersPerPageNumber, totalUserNumber, paginate }) => {
    const pageSwitcherBtnNames = [];
    let i = 1;

    while (totalUserNumber / usersPerPageNumber >= i) {
        pageSwitcherBtnNames.push(String(i));
        i++;
    }

    const handlePageSwitch = (btnValue: string) => {
        paginate(Number(btnValue));
    };

    return (
        <div className={style.paginationWrapper}>
            {pageSwitcherBtnNames.map((btnValue: string) => (
                <>
                    <Button className={style.pageSwitchBtn} onClick={() => handlePageSwitch(btnValue)}>
                        {btnValue}
                    </Button>
                </>
            ))}
        </div>
    );
};

export default Pagination;
