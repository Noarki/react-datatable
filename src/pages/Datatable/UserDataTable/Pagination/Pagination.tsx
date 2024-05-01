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
    pageSwitcherBtnNames: string[];
    pageSwitcherSearchedBtnNames: string[];
}

const Pagination: React.FC<IProps> = ({
    usersPerPageNumber,
    totalUserNumber,
    paginate,
    currentPage,
    searchResults,
    pageSwitcherBtnNames,
    pageSwitcherSearchedBtnNames,
}) => {
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

    const renderOptimizedBtn = (BtnsNamesArray: string[]) => {
        if (BtnsNamesArray.length > 5 && currentPage > 3) {
            let optimizedPageSwitcherBtnNames = BtnsNamesArray.slice(currentPage - 2, currentPage + 1);
            if (currentPage !== BtnsNamesArray.length - 1 && currentPage <= BtnsNamesArray.length - 1) {
                optimizedPageSwitcherBtnNames.push(String(BtnsNamesArray.length));
            }

            optimizedPageSwitcherBtnNames.unshift('1');
            return renderBtnsArray(optimizedPageSwitcherBtnNames);
        } else if (BtnsNamesArray.length === 1) {
            return <></>;
        } else if (pageSwitcherBtnNames.length > 5) {
            let optimizedPageSwitcherBtnNames = BtnsNamesArray.slice(0, currentPage + 2);

            return renderBtnsArray(optimizedPageSwitcherBtnNames);
        } else {
            return renderBtnsArray(BtnsNamesArray);
        }
    };

    // const renderSearchedBtn = () => {
    //     if (searchResultsBtnNames.length > 5 && currentPage > 3) {
    //         let optimizedPageSwitcherBtnNames = searchResultsBtnNames.slice(currentPage - 3, currentPage + 2);
    //         return renderBtnsArray(optimizedPageSwitcherBtnNames);
    //     } else if (pageSwitcherBtnNames.length > 5) {
    //         let optimizedPageSwitcherBtnNames = searchResultsBtnNames.slice(0, currentPage + 2);

    //         return renderBtnsArray(optimizedPageSwitcherBtnNames);
    //     } else {
    //         return renderBtnsArray(pageSwitcherBtnNames);
    //     }
    // };

    return (
        <div className={style.paginationWrapper}>
            {searchResults.length > 0
                ? renderOptimizedBtn(pageSwitcherSearchedBtnNames)
                : renderOptimizedBtn(pageSwitcherBtnNames)}
            {/* {renderOptimizedBtn(pageSwitcherBtnNames)} */}
        </div>
    );
};

export default Pagination;
