
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {User, IUser, IArrayItem, IReadingBookItem} from "./model.js"
import BookServices from "../book/services.js"
import { IBook } from "../book/model.js"
import { Types } from "mongoose"

const HASH_KEY = '507efdf8992d4e9ff3343f55334c2de8929da7ff93d7063aadb01a4fec6869e62c642e77b64f06e1466f16bb087b3f039ba154e63a2306aadd4a546120f935a0';


async function getAllUsers():Promise<IUser[]>{
    return await User.find()
}

const signup = async (email: string, username: string, password: string) => {

    if(email === undefined || username === undefined || password === undefined){
        throw new Error ("Missing data")
    }

    const salt = await bcrypt.genSalt(10);
    let passwordCrypted = await bcrypt.hash(password, salt);

    const user = new User({
        username: username,
        password: passwordCrypted,
        email:    email
    });

    await user.save();
}

const signin = async (email: string, hasshedPassword: string):Promise<any> => {
    const user:IUser = await User.findOne({ email: email });
    if(user) {
        const validPassword = await bcrypt.compare(hasshedPassword, user.password);
        return user._id;
        const id = 1;
        if (validPassword) {
           let token = jwt.sign({ id }, HASH_KEY, {
             algorithm: 'HS256'
           });
          console.log(token.toString());
          return token.toString();
        } else {
            throw new Error("Invalid login")
        }
    } else {
        throw new Error("Invalid login")
    }
}

const addToWishList = async (wishList: IArrayItem[], bookID: Types.ObjectId, userID: Types.ObjectId) => {
    let newWishList = [...wishList]
    console.log("HELLOOOOOO HELLOOOO HELLLLOOOO");
    
    newWishList.push({id: bookID, date: new Date()});
    const filter = { _id: userID};
    const update = { wishList: newWishList };
    await User.findOneAndUpdate(filter, update, {
        new: true
    });
}

const addToCurrentlyReading = async (user: IUser, pageNum: number, totalPages: number, id: Types.ObjectId)=> {
    let newCurrentlyReading = [...user.currentlyReading]
    let inArray = false;
    let pagesRead = 0;
    for (const book of newCurrentlyReading) {
        if (book.id === id){
            pagesRead = (pageNum - book.pagesRead) > 0 ? pageNum - book.pagesRead :  pageNum
            inArray = true
            book.totalPages = (totalPages === undefined) ? book.totalPages : totalPages
            book.pagesRead = pageNum
        }
    }
    if(!inArray) {
        if (totalPages === undefined) 
            throw new Error("Please enter the total number of pages!")
        newCurrentlyReading.push({id: id, pagesRead: pageNum, totalPages: totalPages});
        pagesRead = pageNum;
    }
    let newReport = [...user.habitHistory]
    inArray = false
    let date = new Date()
    date.setHours(0,0,0,0)
    for(const el of newReport){
        if (+el.date === +date){
            el.pagesRead += pageNum;
            inArray = true;
            break;
        }
    }
    if(!inArray)
        newReport.push({date: date, pagesRead: pageNum})

    const filter = { _id:  user['_id']};
    const update = { currentlyReading: newCurrentlyReading,  habitHistory: newReport};

    await User.findOneAndUpdate(filter, update, {
        new: true
    });

}

const addToDone = async (user: IUser, bookID: Types.ObjectId) => {
    let newFinished = [...user.finished]

    newFinished.push({id: bookID, date: new Date()});

    const year = new Date().getFullYear()
    let newYearlyReport = [...user.yearlyReport];
    let inArray = false;
    for (const el of newYearlyReport){
        if(el.year === year){
            el.booksRead++;
            inArray = true;
            break;
        }
    }

    if(!inArray){
        newYearlyReport.push({year: year, booksRead: 1});
    }

    const filter = { _id:  user['_id']};
    const update = { finished: newFinished, yearlyReport: newYearlyReport };

    await User.findOneAndUpdate(filter, update, {
        new: true
    });


}

interface IRecomandationList {
    title: string;
    similarBooks: IBook[];
}

const getRecomended = async (user: IUser):Promise<IRecomandationList[]> => {
    let recentlyRead:IArrayItem[] = user.finished.sort(() => 0.5 - Math.random()).slice(0,3)
    let bookList:IBook[] = await Promise.all(recentlyRead.map((el:IArrayItem) => {
        try {
            return BookServices.getBookByID(el.id)
        } catch (err){
            console.log(err);
        }
    }))
    
    let recommendedList:IRecomandationList[] =await Promise.all(bookList.map(async(book):Promise<IRecomandationList> => {
        try {
            
            const bookList:IBook[] = await BookServices.getSimilarBooks(book.plot)
            
            let item:IRecomandationList = {"title": "Based on " + book.title + " by: " + book.author, "similarBooks": bookList};
            return item
        } catch(err){
            console.log(err);
        }
    }))
    return recommendedList;
}

const getPagesReadToday = (user: IUser): number => {
    return user.habitHistory.filter(el => +el.date === +(new Date().setHours(0,0,0,0)))[0].pagesRead
}

const getNumOfBooksReadThisYear = (user: IUser): number => {
    console.log(user.yearlyReport[0]);
    
    return user.yearlyReport.filter(el => el.year === (new Date().getFullYear()))[0].booksRead
}

const setGoals = async (userID: Types.ObjectId, dailyGoal: number, yearlyGoal: number) => {
    const filter = { _id: userID};
    const update = {}
    if(dailyGoal){
        update['dailyGoal']= dailyGoal
    }
    if (yearlyGoal){
        update['yearlyGoal']=yearlyGoal
    }
    await User.findOneAndUpdate(filter, update, {
        new: true
    });

}

const getBooksReadThisYear = async (user: IUser) => {
    const date = new Date().getFullYear();
    const listOfIds = user.finished.filter(data => data.date.getFullYear() === date);
    console.log(user.finished[0].date.getFullYear(), date);
    
    const promises = listOfIds.map(async data => {
        try {
            const book = await BookServices.getBookByID(data.id)
            return book
        } catch (err){
            console.log(err.message)
        }
    })
    const list = await Promise.all(promises)
    return list;
}

interface IRWish{
    book: IBook;
    dateAdded: Date;
}

const getWishlist =async (user:IUser):Promise<IRWish[]> => {
    const promises = user.wishList.map(async item => {
        try {
            return {"book": await BookServices.getBookByID(item.id),"dateAdded": item.date}
        } catch(err){
            console.log(err.message);
        }
    })
    return await Promise.all(promises)
}

const getDone = async (user:IUser):Promise<IRWish[]> => {
    const promises = user.finished.map(async item => {
        try {
            return {"book": await BookServices.getBookByID(item.id),"dateAdded": item.date}
        } catch(err){
            console.log(err.message);
        }
    })
    return await Promise.all(promises)
}


const removeFromList =(list:IArrayItem[] | IReadingBookItem[], id:Types.ObjectId):IReadingBookItem[] | IArrayItem[] => {
    let newList:IReadingBookItem[] | IArrayItem[] = [...list] as IReadingBookItem[] | IArrayItem[]
    for( var i = 0; i < newList.length; i++){ 
        if ( newList[i].id == id) { 
            console.log("belaavok", id);
            console.log(newList.splice(i, 1))
            console.log(newList);
        }
    }
    return newList;
}

const removeWishlist =async (user:IUser, bookID:string) => {
    let newList = removeFromList(user.wishList, new Types.ObjectId(bookID))
    const update = {wishList: newList};
    await User.findByIdAndUpdate(user._id, update, 
        function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated User : ", docs);
            }}
        );
}

const removeReading =async (user:IUser, bookID:string) => {
    let newList = removeFromList(user.currentlyReading, new Types.ObjectId(bookID))
    const update = {currentlyReading: newList};
    await User.findByIdAndUpdate(user._id, update, 
        function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated User : ", docs);
            }}
        );
}


interface IRReading {
    book:IBook;
    pagesRead:number;
    totalPages:number;
}

const getReading =async (user:IUser):Promise<IRReading[]> => {
    const promises = user.currentlyReading.map(async item => {
        try {
            return {"book": await BookServices.getBookByID(item.id),"pagesRead": item.pagesRead, "totalPages": item.totalPages}
        } catch(err){
            console.log(err.message);
        }
    })
    return await Promise.all(promises)
}

interface IRCategory{
    cat: string;
    num: number;
}

const getCategoriesReadThisYear = async(user:IUser):Promise<IRCategory[]> => {
    
    const books: IBook[]= await getBooksReadThisYear(user)
    const counts = {}
    console.log(books);
    
    for(var book of books){
        if(book.geners){
            
            const json:object = JSON.parse(book.geners)
            for (var cat of Object.values(json)){
                counts[cat] = counts[cat]? counts[cat] + 1 : 1
            }
        }
    }    
    return Object.keys(counts).map((key) => {return {'cat': key, 'num': counts[key]}})
}

export default {
    getAllUsers,
    signup,
    signin,
    addToCurrentlyReading,
    addToDone,
    addToWishList,
    getRecomended,
    getBooksReadThisYear,
    getPagesReadToday,
    getNumOfBooksReadThisYear,
    getReading,
    getWishlist,
    getDone,
    getCategoriesReadThisYear,
    removeWishlist,
    removeReading,
    setGoals
}
