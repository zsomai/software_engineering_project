import Services from "./services.js";
const getAllBooks = async (req, res) => {
    try {
        const books = await Services.getAllBooks();
        res.json(books);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
const getBookByID = (req, res) => {
    res.json(req.body.book);
};
const getBookByTitle = async (req, res) => {
    try {
        let book = await Services.getBookByTitle(req.body.title);
        res.status(200).json(book);
    }
    catch (err) {
        res.json(err);
    }
};
const getSimilarBooks = async (req, res) => {
    try {
        const books = await Services.getSimilarBooks(req.body.book.plot);
        console.log("hello");
        console.log(books);
        res.status(200).json(books);
    }
    catch (err) {
        res.json(err);
    }
};
const search = async (req, res) => {
    console.log("hallo", req.params.str);
    try {
        res.status(200).json(await Services.search(req.params.str));
    }
    catch (err) {
        console.log("asdasdasd");
        res.json(err);
    }
};
const addComment = async (req, res) => {
    console.log("asddsaadsasd");
    try {
        await Services.addComment(req.body.book, req.body.userID, req.body.comment);
        res.status(200).json({ "msg": "Comment saved!" });
    }
    catch (err) {
        res.json(err);
    }
};
export default { getAllBooks, getBookByID, getBookByTitle, getSimilarBooks, search, addComment };
//# sourceMappingURL=controller.js.map