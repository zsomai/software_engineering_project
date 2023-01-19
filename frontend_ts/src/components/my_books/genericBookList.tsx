import { useState, useEffect } from "react";
import axios from "axios";
import { IContent, IRReading, IRWish, IUser } from "./interface";
import BookWishList from "./bookWishlist";
import BookReading from "./bookReading";
import Book from "./Book"
import "./static/style.css";

interface IProps{
    data: IContent|undefined
    listType: "wishlist" | "reading" | "normal"
    reloadWishlist?: any
    reloadReading?:any
    reloadDone?:any
    userID: string
}

const BookListView = ({data, listType, reloadReading, reloadDone, reloadWishlist, userID}:IProps) => {
    if (listType === "normal") {
        console.log(data, listType);
    }
    
    if(data)
        return(
            <div>
                <div className="title">{data.title}</div>
                <div className="book-list">{data.bookList.map(content =>{
                            switch(listType){
                                case "wishlist":
                                    return <BookWishList data = {content as IRWish} reloadReading = {()=> reloadReading()} reloadWishlist = {()=> reloadWishlist()}/>
                                    break;
                                case "reading":
                                    return <BookReading userID = {userID as string} data = {content as IRReading} reloadDone = {()=> reloadDone()} reloadReading = {()=> reloadReading()}/>
                                    break;
                                case "normal":
                                    return <Book userID={userID as string} data = {content.book} />
                                    break;
                            }
                        } 
                    )}</div>    
            </div>
        )
    else{
        return<div>Loading...</div>
    }
}

export default BookListView;