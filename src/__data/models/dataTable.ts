export interface IDataTable {
    allUsersList: IUserData[];
    activeUser?: IUserData;
    loading: boolean;
    error: boolean;
    filtrationType: EOrder;
}

export interface IUserData {
    id: number | string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    description: string;
    address: IAddres;
}

export interface IAddres {
    streetAddress: string;
    city: string;
    state: string;
    zip: number | string;
}

export enum EOrder {
    ASC = 1,
    DESC = 2,
    NONE = 0,
}
