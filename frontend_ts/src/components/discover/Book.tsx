import React, { useState } from "react";

import { IBook  } from "./interfaces";
import noPicture from "../../not_found.jpeg";
import BookDetailed from "./book-detailed";
import BackDrop from "./backDrop";
interface IBookProp {
    book: IBook;
    userID: string
}

const Book = ({book, userID}:IBookProp) => {
    const [open, setOpen] = useState<boolean>(false)
    return(
        <React.Fragment>
        <div className="recommandation-book" onClick={() => setOpen(true)}>
            <div className="image"><img src= {(book.image)? book.image : noPicture}/></div>
            <div>{book.title}</div>
            <div>{book.author}</div>
        </div>
        {open &&
        <React.Fragment>
            <BackDrop click={() => setOpen(false)} />
            <BookDetailed book={book} closeAll={() => setOpen(false)} userID={userID}/>
        </React.Fragment>
        }
        </React.Fragment>
    )
}

export default Book;