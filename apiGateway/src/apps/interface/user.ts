



export interface IHobbies {
    _id: string;
    passionLevel: string;
    name: string;
    year: number;
}


export interface IUser {
    _id: string;
    name: string;
    hobbies: IHobbies;
}