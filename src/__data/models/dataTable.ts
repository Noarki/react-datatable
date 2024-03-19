export interface IdataTable {
    allUsersList: IuserData[];
}

export interface IuserData {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
}
