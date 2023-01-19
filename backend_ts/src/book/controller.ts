import Services from "./services.js";
import { IBook } from "./model.js";
import {Request, Response } from "express";


const getAllBooks = async (req: Request, res: Response) => {
    try{
        const books:IBook[] = await Services.getAllBooks();
        res.json(books);
    } catch (err){
        res.status(500).json({message: err});
    }
};

const getBookByID = (req, res) => {
    res.json(req.body.book);
};

const getBookByTitle = async (req, res) => {
    try {
        let book = await Services.getBookByTitle(req.body.title)
        res.status(200).json(book)
    } catch(err){
        res.json(err)
    }
}

const getSimilarBooks =async (req:Request, res: Response) => {
    try {
        const books:IBook[] = await Services.getSimilarBooks(req.body.book.plot)
        console.log("hello");
        console.log(books);
    
        res.status(200).json(books)
    } catch (err) {
        res.json(err)
    }
}

const search =async (req:Request, res: Response) => {
    console.log("hallo", req.params.str);
    
    try {
        res.status(200).json(await Services.search(req.params.str))
    } catch (err) {
        console.log("asdasdasd");
        
        res.json(err)
    }
}

const addComment = async (req:Request, res: Response) => {
    console.log("asddsaadsasd");
    
    try {
        await Services.addComment(req.body.book, req.body.userID, req.body.comment)
        res.status(200).json({"msg": "Comment saved!"});
    } catch (err) {
        res.json(err);
    }
}

export default { getAllBooks, getBookByID, getBookByTitle, getSimilarBooks, search, addComment};
