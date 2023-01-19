import mongoose from "mongoose";
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
}, { collection: 'book' });
const Book = mongoose.model('book', BookSchema);
export { Book };
//# sourceMappingURL=model.js.map