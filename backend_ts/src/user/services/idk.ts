import mongoose, { Date, StringExpression } from "mongoose";
import { Types } from "mongoose";

interface ITokens {
    id: Types.ObjectId
    token: string
    expires_at: Date
}


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

}, {collection: 'token'})