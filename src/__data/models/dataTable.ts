export interface IdataTable {
    allUsersList: IuserData[];
    loading: boolean;
    error: boolean;
}

export interface IuserData {
    id: number;
    name: string;
    surname: string;
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
