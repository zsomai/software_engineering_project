import express from "express";
import Controller from "./controller.js";
import { getBookById } from "./middleware.js";
const router = express.Router();
router.get('/', Controller.getAllBooks);
router.get('/search/:str', Controller.search);
router.get('/get-book-by-title', Controller.getBookByTitle);
router.patch('/add-comment/:id', getBookById, Controller.addComment);
router.get('/get-similar/:id', getBookById, Controller.getSimilarBooks);
router.get('/:id', getBookById, Controller.getBookByID);
export default router;
//# sourceMappingURL=routes.js.map