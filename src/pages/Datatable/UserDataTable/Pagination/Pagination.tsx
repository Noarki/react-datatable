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
    
}

const Pagination: React.FC<IProps> = ({
    usersPerPageNumber,
    totalUserNumber,
    paginate,
    currentPage,
    searchResults,
    pageSwitcherBtnNames,
    
}) => {
    

    const handlePageSwitch = (btnValue: string) => {
        paginate(Number(btnValue));
    };

    const renderBtnsArray = (optimizedPageSwitcherBtnNames: string[]) => {
        console.log('renderBtnsArray');
        
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
        console.log('renderOptimizedBtn');
        
        if (pageSwitcherBtnNames.length > 5 && currentPage > 3) {
            console.log('renderOptimizedBtn1');
            let optimizedPageSwitcherBtnNames = pageSwitcherBtnNames.slice(currentPage - 2, currentPage + 1);
            if (currentPage !== pageSwitcherBtnNames.length - 1 && currentPage <= pageSwitcherBtnNames.length - 1) {
                optimizedPageSwitcherBtnNames.push(String(pageSwitcherBtnNames.length));
            }
            optimizedPageSwitcherBtnNames.unshift('1');
            return renderBtnsArray(optimizedPageSwitcherBtnNames);
        } else if (pageSwitcherBtnNames.length > 5) {
            console.log('renderOptimizedBtn2');
            let optimizedPageSwitcherBtnNames = pageSwitcherBtnNames.slice(0, currentPage + 2);

            return renderBtnsArray(optimizedPageSwitcherBtnNames);
        } else {
            console.log('renderOptimizedBtn3');
            return renderBtnsArray(pageSwitcherBtnNames);
        }
    };

    // const renderFilteredBtn = () => {
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
            {/* {searchResults.length > 0 ? renderFilteredBtn() : renderOptimizedBtn()} */}
            {renderOptimizedBtn()}
        </div>
    );
};

export default Pagination;
