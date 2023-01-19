import mongoose from "mongoose";
const TokensSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    token: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    expires_at: {
        type: mongoose.SchemaTypes.Date,
        required: true,
    }
}, { collection: 'token' });
//# sourceMappingURL=idk.js.map