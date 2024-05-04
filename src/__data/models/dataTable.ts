export interface IdataTable {
    allUsersList: IuserData[];
    activeUser?: IuserData;
    loading: boolean;
    error: boolean;
}

export interface IuserData {
    id: number | string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    description: string;

    address: Iaddres;
}

export interface Iaddres {
    streetAddress: string;
    city: string;
    state: string;
    zip: number | string;
}

export enum Eorder {
    ASC = 1,
    DESC = 2,
    NONE = 0,
}
