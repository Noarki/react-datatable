export interface IdataTable {
    allUsersList: IuserData[];
    activeUser?: IuserData;
    loading: boolean;
    error: boolean;
}

export interface IuserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    description: string;

    addres: Iaddres;
}

export interface Iaddres {
    streetAddress: string;
    city: string;
    state: string;
    zip: number;
}
