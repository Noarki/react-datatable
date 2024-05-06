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

            return renderBtnsArray(['1', ...optimizedPageSwitcherBtnNames]);
        } else if (BtnsNamesArray.length === 1) {
            return <></>;
        } else if (pageSwitcherBtnNames.length > 5) {
            let optimizedPageSwitcherBtnNames = BtnsNamesArray.slice(0, currentPage + 1);
            optimizedPageSwitcherBtnNames.push(String(BtnsNamesArray.length));
            return renderBtnsArray(optimizedPageSwitcherBtnNames);
        } else {
            return renderBtnsArray(BtnsNamesArray);
        }
    };

    return (
        <div className={style.paginationWrapper}>
            {searchResults.length > 0
                ? renderOptimizedBtn(pageSwitcherSearchedBtnNames)
                : renderOptimizedBtn(pageSwitcherBtnNames)}
        </div>
    );
};

export default Pagination;
