import Service from "./services.js";
const getAllUsers = async (req, res) => {
    try {
        const users = await Service.getAllUsers();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
const getUserByID = (req, res) => {
    res.json(req.body.user);
};
const deleteUserByID = async (req, res) => {
    try {
        await res.user.remove();
        res.status(200).json({ message: "User deleted!" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const signup = async (req, res) => {
    try {
        await Service.signup(req.body.email, req.body.username, req.body.password);
        res.status(201).json("Successful sign up!");
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const authentication = async (req, res) => {
    console.log("hallo");
    try {
        let resp = await Service.signin(req.body.email, req.body.password);
        if (resp) {
            res.cookie('token', resp, { maxAge: 300 * 1000 });
            res.status(200).json({ "id": resp });
            res.end();
        }
    }
    catch (err) {
        res.status(400).json(err.message);
    }
};
const addToWishList = async (req, res) => {
    console.log("asdasdasdasdasd");
    try {
        //console.log(req.body.user, req.body.bookID);
        await Service.addToWishList(req.body.user.wishList, req.body.bookID, req.body.user._id);
        res.status(201).json({ message: "Book added to the wishlist!" });
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};
const addToCurrentlyReading = async (req, res) => {
    console.log("asdadsasdasdasdsadsda", req.body);
    try {
        await Service.addToCurrentlyReading(req.body.user, req.body.pageNum, req.body.totalPages, req.body.id);
        res.status(201).json({ message: "Book added to the currently reading!" });
    }
    catch (err) {
        res.status(400).json(err.message);
    }
};
const addToDone = async (req, res) => {
    try {
        await Service.addToDone(req.body.user, req.body.bookID);
        res.status(201).json({ message: "Book added to the to finished!" });
    }
    catch (err) {
        res.status(400).json(err.message);
    }
};
const getRecomended = async (req, res) => {
    console.log("ASD: ", req.body.user);
    try {
        res.status(200).json(await Service.getRecomended(req.body.user));
    }
    catch (err) {
        res.json({ "message": err.message });
    }
};
const getDailyReport = async (req, res) => {
    res.send(req.body.user.habitHistory);
};
const getYearlyReport = async (req, res) => {
    res.send(req.body.user.yearlyReport);
};
const setGoals = async (req, res) => {
    try {
        Service.setGoals(req.body.user["_id"], req.body.dailyGoal, req.body.yearlyGoal);
        res.status(201).json({ message: "Goals updated!" });
    }
    catch (err) {
        res.status(400).json(err.message);
    }
};
const getYearlyGoals = async (req, res) => {
    //console.log(req.body.user.yearlyGoal);
    res.status(200).json({ "data": req.body.user.yearlyGoal });
};
const getBooksReadThisYear = async (req, res) => {
    try {
        let list = await Service.getBooksReadThisYear(req.body.user);
        res.status(200).json(list);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};
const getPagesReadToday = (req, res) => {
    res.status(200).json({ "pages": Service.getPagesReadToday(req.body.user) });
};
const getNumOfBooksReadThisYear = (req, res) => {
    res.status(200).json({ "books": Service.getNumOfBooksReadThisYear(req.body.user) });
};
const getDone = async (req, res) => {
    try {
        res.status(200).json(await Service.getDone(req.body.user));
    }
    catch (err) {
    }
};
const removeReading = async (req, res) => {
    try {
        await Service.removeReading(req.body.user, req.body.id);
        res.status(200).json({ "message": "Removed!" });
    }
    catch (err) {
    }
};
const removeWishList = async (req, res) => {
    try {
        console.log("hallooooo");
        await Service.removeWishlist(req.body.user, req.body.id);
        res.status(200).json({ "message": "Removed!" });
    }
    catch (err) {
    }
};
const getWishlist = async (req, res) => {
    try {
        res.status(200).json(await Service.getWishlist(req.body.user));
    }
    catch (err) {
    }
};
const getReading = async (req, res) => {
    try {
        res.status(200).json(await Service.getReading(req.body.user));
    }
    catch (err) {
    }
};
const getGeners = async (req, res) => {
    console.log("Control: hallo");
    try {
        res.status(200).json(await Service.getCategoriesReadThisYear(req.body.user));
    }
    catch (err) {
        res.json(err);
    }
};
export default {
    getAllUsers,
    getUserByID,
    deleteUserByID,
    signup,
    authentication,
    addToCurrentlyReading,
    addToDone,
    addToWishList,
    getRecomended,
    getDailyReport,
    getYearlyReport,
    getBooksReadThisYear,
    getPagesReadToday,
    getNumOfBooksReadThisYear,
    getReading,
    getDone,
    getWishlist,
    getGeners,
    removeReading,
    removeWishList,
    getYearlyGoals,
    setGoals
};
//# sourceMappingURL=controller.js.map