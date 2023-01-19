import { Book } from "./model.js";
export async function getBookById(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Cannot find book!' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    req.body.book = book;
    next();
}
export default { getBookById };
//# sourceMappingURL=middleware.js.map