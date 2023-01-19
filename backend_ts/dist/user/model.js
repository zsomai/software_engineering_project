import mongoose from "mongoose";
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
        type: [{}],
        required: true,
        default: []
    },
    finished: {
        type: [{}],
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
});
const User = mongoose.model('User', UserSchema);
export { User };
//# sourceMappingURL=model.js.map