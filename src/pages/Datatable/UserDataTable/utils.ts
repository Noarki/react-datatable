import { IUserData } from '../../../__data/models/dataTable';

export const countPageQuantity = (arr: IUserData[], usersPerPageNumber: number) => {
    let pageQuantity = Math.ceil(arr.length / usersPerPageNumber);
    let emptyArr = [];

    for (let i = 1; i <= pageQuantity; i++) {
        emptyArr.push(String(i));
    }

    return emptyArr;
};

export const paginate = (pageNumber: number, setCurrentPage: (page: number) => void) =>
    setCurrentPage(pageNumber);
