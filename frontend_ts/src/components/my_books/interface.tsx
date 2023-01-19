
export interface IComment{
    user: string,
    comment: string
}

export interface IBook {
    title: string,
    wikiId: string,
    freebaseID: string,
    author: string,
    geners: string,
    image: string,
    plot: string,
    publication: string,
    comments: IComment[]
    _id: string,
}

export interface IRecommandationList {
    title: string;
    similarBooks: IBook[];
}

export interface IRReading {
    book:IBook;
    pagesRead:number;
    totalPages:number;
}

export interface IRWish{
    book: IBook;
    dateAdded: Date;
}

export interface IContent {
    title: string;
    bookList: IRWish[] | IRReading[];
}


interface IReadingBookItem {
    pagesRead: number;
    totalPages: number;
    id: string;
}

interface IArrayItem {
    id: string;
    date: Date;
}

interface IDailyReport{
    date: Date;
    pagesRead: number;
}

interface IYearlyReport{
    year: number;
    booksRead: number;
}

export interface IUser {
    username: string;
    password: string;
    email: string;
    dailyGoal: number;
    yearlyGoal: number;
    currentlyReading: IReadingBookItem[];
    finished: IArrayItem[];
    wishList: IArrayItem[];
    habitHistory: IDailyReport[];
    yearlyReport: IYearlyReport[];
    _id: string
}
