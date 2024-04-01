import React from 'react';
import Button from '../../../../components/main-Page-Components/button/Button';
import style from './Pagination.module.scss';
import { IuserData } from '../../../../__data/models/dataTable';

interface IProps {
    usersPerPageNumber: number;
    totalUserNumber: number;
    currentPage: number;
    searchResults: IuserData[];
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<IProps> = ({
    usersPerPageNumber,
    totalUserNumber,
    paginate,
    currentPage,
    searchResults,
}) => {
    const pageSwitcherBtnNames: string[] = [];
    const searchResultsBtnNames: string[] = [];
    let i = 1;

    while (totalUserNumber / usersPerPageNumber >= i) {
        pageSwitcherBtnNames.push(String(i));
        i++;
    }

    while (searchResults.length / usersPerPageNumber >= i) {
        searchResultsBtnNames.push(String(i));
        i++;
    }

    const handlePageSwitch = (btnValue: string) => {
        paginate(Number(btnValue));
    };

    const renderBtnsArray = (optimizedPageSwitcherBtnNames: string[]) => {
        return optimizedPageSwitcherBtnNames.map((btnValue: string) => (
            <div className={style.paginationBtnsWrapper}>
                <Button
                    className={
                        String(currentPage) === btnValue ? style.pageSwitchBtnActive : style.pageSwitchBtn
                    }
                    onClick={() => handlePageSwitch(btnValue)}
                >
                    {btnValue}
                </Button>
            </div>
        ));
    };

    const renderOptimizedBtn = () => {
        if (pageSwitcherBtnNames.length > 5 && currentPage > 3) {
            let optimizedPageSwitcherBtnNames = pageSwitcherBtnNames.slice(currentPage - 3, currentPage + 2);

            return renderBtnsArray(optimizedPageSwitcherBtnNames);
        } else if (pageSwitcherBtnNames.length > 5) {
            let optimizedPageSwitcherBtnNames = pageSwitcherBtnNames.slice(0, currentPage + 2);

            return renderBtnsArray(optimizedPageSwitcherBtnNames);
        } else {
            return renderBtnsArray(pageSwitcherBtnNames);
        }
    };

    const renderFilteredBtn = () => {
        if (searchResultsBtnNames.length > 5 && currentPage > 3) {
            let optimizedPageSwitcherBtnNames = searchResultsBtnNames.slice(currentPage - 3, currentPage + 2);
            return renderBtnsArray(optimizedPageSwitcherBtnNames);
        } else if (pageSwitcherBtnNames.length > 5) {
            let optimizedPageSwitcherBtnNames = searchResultsBtnNames.slice(0, currentPage + 2);

            return renderBtnsArray(optimizedPageSwitcherBtnNames);
        } else {
            return renderBtnsArray(pageSwitcherBtnNames);
        }
    };

    return (
        <div className={style.paginationWrapper}>
            {searchResults.length > 0 ? renderFilteredBtn() : renderOptimizedBtn()}
        </div>
    );
};

export default Pagination;
