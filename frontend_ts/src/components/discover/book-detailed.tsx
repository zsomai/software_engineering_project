import React, { useEffect, useState } from "react";

import { IBook, IComment, IUser } from "../my_books/interface"
import noImg from "../../not_found.jpeg";
import urls from "../../static/urls";
import axios from "axios";

interface IProps{
    book: IBook;
    closeAll: any;
    userID: string

}

interface IPopUp{
    id: string
    closeAll: any
    userID: string
}

const CurrentlyReadindPopUp = ({id, closeAll, userID}:IPopUp) => {
    const [pages, setPages] = useState<number>()
    const [totalPages, setTotalPages] = useState<number>()
    
    const save = () => {
        axios.patch(urls.API_ADD_READING_URL + userID,
         {
            "id": id,
            "pageNum": pages,
            "totalPages": totalPages
         })
         closeAll()
    }

    return (
        <div className="pop-up">
            <label>Total pages of my copy:</label> <input onChange={(inp) => setTotalPages(Number(inp.target.value))} type="number"/>
            <label>Number of pages I read:</label> <input onChange={(inp) => setPages(Number(inp.target.value))} type="number"/>
            <div className="button" onClick={() => save()}>Save</div>
        </div>
    )
}

interface I {
    content: IComment
}

const CommentField = ({content}:I) => {
    const [user, setUser] = useState<IUser>()
    useEffect(()=> {
        axios.get(urls.API_GET_USER + content.user).then((res)=> setUser(res.data))
    }, []) 
    if (user)
        return (
        <div>
            <div>{user.username}</div>
            <div>{content.comment}</div>
        </div>
        )
    return <React.Fragment />
}


const BookDetailed = ({book, closeAll, userID}:IProps) => {
    const [show, setShow] = useState<boolean>(false)


    const addToWishlist = () => {
        console.log("asadsdasasdads");
        
        axios.patch(urls.API_ADD_WISHLIST_URL+userID,
            {
            "bookID": book._id
            })
        closeAll();
    }

    return (
    <div className="detail-view">
        <div className="image"><img src={book.image? book.image : noImg} /></div>
        <div className="text">Title: {book.title}</div>
        {book.author && <div className="text">Author: {book.author}</div>}
        {book.publication &&<div className="text">Publication date: {book.publication}</div>}
        {book.geners && 
        <div className="genre-list">
            <div>Genres: </div>
            {Object.values(JSON.parse(book.geners)).map(cat => {return <div>{cat as string}</div>})}
        </div>
        }
        <div className="comment-list">
            {book.comments.map((comment) => {return <CommentField content={comment}/>}) }
        </div>
        <div className="button" onClick={() => addToWishlist()}>Add to wishlist!</div>
        <div className="button" onClick={() => setShow(true)}>Add to curently reading!</div>
        {show && <CurrentlyReadindPopUp userID = {userID} id={book._id} closeAll ={closeAll} />}
    </div>
    )
}

export default BookDetailed;