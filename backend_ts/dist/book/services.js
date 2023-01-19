import { Types } from "mongoose";
import { spawn } from 'child_process';
import { Book } from "./model.js";
async function getAllBooks() {
    return await Book.find();
}
async function getBookByID(bookID) {
    let book;
    book = await Book.findById(bookID);
    if (book == null) {
        throw new Error("ID doesn't exist!");
    }
    return book;
}
async function getBookByTitle(title) {
    const book = await Book.findOne({ title: title });
    if (book == null) {
        throw new Error("Book doesn't exists!");
    }
    return book;
}
const getDataFromPythonScript = async (command, args) => {
    const python = spawn(command, args);
    return new Promise((resolve, reject) => {
        let result = "";
        python.stdout.on('data', (data) => {
            result += data;
        });
        python.on('close', () => {
            resolve(result.toString());
        });
        python.on('error', (err) => {
            reject(err);
        });
    });
};
async function getSimilarBooks(plot) {
    let data = await getDataFromPythonScript('python3', ['/Users/somaizsombor/egyetem/is/backend_ts/src/ml/recomandation.py', plot]);
    let bookTitleList = data.split('|');
    let bookList = bookTitleList.map(async (id) => {
        try {
            console.log(id);
            return await getBookByID(new Types.ObjectId(id));
        }
        catch (err) {
            //console.log(err);
        }
    });
    const list = await Promise.all(bookList);
    console.log(list);
    return list.filter(element => {
        return element !== undefined;
    });
}
const search = async (str) => {
    const regex = new RegExp(str, 'i'); // i for case insensitive
    return await Book.find({ title: { $regex: regex } });
};
const addComment = async (book, user, comment) => {
    let newComments = [...book.comments];
    console.log("dasdas");
    newComments.push({ user: user, comment: comment });
    const filter = { _id: book._id };
    const update = { comments: newComments };
    await Book.findOneAndUpdate(filter, update, { new: true });
    console.log("qwe");
};
export default {
    getAllBooks,
    getBookByTitle,
    getSimilarBooks,
    search,
    addComment,
    getBookByID
};
//# sourceMappingURL=services.js.map