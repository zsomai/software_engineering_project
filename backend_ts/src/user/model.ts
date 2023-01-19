import mongoose from "mongoose"
import { Types } from "mongoose"


interface IReadingBookItem {
    pagesRead: number;
    totalPages: number;
    id: Types.ObjectId;
}

interface IArrayItem {
    id: Types.ObjectId;
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

interface IUser {
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
    _id: Types.ObjectId
}

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    wishList: {
        type: [{}],
        required: true,
        default: []
    },
    currentlyReading: {
        type: [{}],         //book: mongoose.Types.ObjectId, pagesRead: mongoose.Types.Number
        required: true,
        default: []
    },
    finished: {
        type: [{}],         //book: mongoose.Types.ObjectId, dateFinished: mongoose.Types.Date
        required: true,
        default: []
    },
    dailyGoal: {
        type: mongoose.SchemaTypes.Number,
    },
    yearlyGoal: {
        type: mongoose.SchemaTypes.Number,
    },
    habitHistory: {
        type: [{}],
        default: []
    },
    yearlyReport: {
        type: [{}],         
        default: []
    },

})

const User = mongoose.model<IUser>('User', UserSchema);

export  {
    User,
    IUser,
    IReadingBookItem,
    IArrayItem,
    IDailyReport,
    IYearlyReport
}
