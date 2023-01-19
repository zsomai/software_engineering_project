import {Book, IBook} from "./model.js";
import {Requset, Response, Next} from "express"


export async function getBookById(req: Requset, res: Response, next: Next){
    let book:IBook;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Cannot find book!' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    req.body.book = book;
    next();
}

export default { getBookById }