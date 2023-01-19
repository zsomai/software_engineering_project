import express from "express";
import Controller from "./controller.js";
import { getUserByID } from "./middleware.js";
const router = express.Router();
router.get('/', Controller.getAllUsers);
router.get('/get-recommended/:id', getUserByID, Controller.getRecomended);
router.get('/:id', getUserByID, Controller.getUserByID);
router.post('/authentication', Controller.authentication);
router.delete('/:id', getUserByID, Controller.deleteUserByID);
router.post('/signup', Controller.signup);
router.patch('/add-book-to-wishlist/:id', getUserByID, Controller.addToWishList);
router.patch('/add-book-to-currentlyReading/:id', getUserByID, Controller.addToCurrentlyReading);
router.patch('/add-book-to-done/:id', getUserByID, Controller.addToDone);
router.patch('/set-goals/:id', getUserByID, Controller.setGoals);
router.get('/get-daily-report/:id', getUserByID, Controller.getDailyReport);
router.get('/get-yearly-report/:id', getUserByID, Controller.getYearlyReport);
router.get('/get-books-read-this-year/:id', getUserByID, Controller.getBooksReadThisYear);
router.get('/number-of-pages-read-today/:id', getUserByID, Controller.getPagesReadToday);
router.get('/number-of-books-read-this-year/:id', getUserByID, Controller.getNumOfBooksReadThisYear);
router.get('/wishlist/:id', getUserByID, Controller.getWishlist);
router.get('/done/:id', getUserByID, Controller.getDone);
router.get('/reading/:id', getUserByID, Controller.getReading);
router.get('/categories-read/:id', getUserByID, Controller.getGeners);
router.get('/get-yearly-goal/:id', getUserByID, Controller.getYearlyGoals);
router.patch('/remove-reading/:id', getUserByID, Controller.removeReading);
router.patch('/remove-wishlist/:id', getUserByID, Controller.removeWishList);
export default router;
//# sourceMappingURL=routes.js.map