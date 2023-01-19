import mongoose from "mongoose";
import { Types } from "mongoose"


interface IComment{
    user: Types.ObjectId,
    comment: string
}

interface IBook {
    _id: Types.ObjectId
    title: string,
    wikiId: string,
    freebaseID: string,
    author: string,
    geners: string,
    image: string,
    plot: string,
    comments: IComment[],
    publication: string
}


const BookSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    wikiId: {
        type: mongoose.SchemaTypes.String,
        required: true,       
    },
    freebaseID: {
        type: mongoose.SchemaTypes.String,
        required: true,        
    },
    author: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    geners: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    image: {
        type: mongoose.SchemaTypes.String
    },
    plot: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    comments: {
        type: [{}],
        default: []
    },
    publication: {
        type: mongoose.SchemaTypes.String,
    }
}, { collection: 'book' })
const Book = mongoose.model<IBook>('book', BookSchema);


export {
    IBook,
    Book
}