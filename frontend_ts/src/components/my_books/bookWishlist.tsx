import { IRWish, IUser } from "./interface";
import noPicture from "../../not_found.jpeg"
import axios from "axios";
import urls from "../../static/urls";
import BackDrop from "../discover/backDrop";
import React, { useState  } from "react";



interface IProps {
    data: IRWish
    reloadWishlist: any
    reloadReading: any
}

interface IPopUp{
    id: string
    closeAll: any
}


const CurrentlyReadindPopUp = ({id, closeAll}:IPopUp) => {
    const [pages, setPages] = useState<number>()
    const [totalPages, setTotalPages] = useState<number>()
    const [comment, setComment] = useState<string>()

    const save = () => {
        axios.patch(urls.API_ADD_READING_URL + "63a7099b2abcfa4b5c790f8d",
         {
            "id": id,
            "pageNum": pages,
            "totalPages": totalPages
         })
         axios.patch(urls.API_REMOVE_WISHLIST_URL + "63a7099b2abcfa4b5c790f8d", {"id": id})
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


const Book = ({data, reloadReading, reloadWishlist}:IProps)=>{
    const [popup, setPopup] = useState<boolean>(false);
    return (
    <React.Fragment>
        <div className="recommandation-book">
            <div className="image"><img src= {(data.book.image)? data.book.image : noPicture}/></div>
            <div>{data.book.title}</div>
            <div>{data.book.author}</div>
            <div className="button" onClick={() => setPopup(true)}>Start reading it!</div>
            <div className="button" onClick={() => {axios.patch(urls.API_REMOVE_WISHLIST_URL + "63a7099b2abcfa4b5c790f8d", {"id": data.book._id}); reloadWishlist();}}>Remove from wishlist</div>
        </div>
        {popup && 
        <React.Fragment>
            <CurrentlyReadindPopUp id = {data.book._id} closeAll={()=> {reloadReading(); reloadWishlist();}}/>
            <BackDrop click={() => setPopup(false)}/>
        </React.Fragment>
        }
        
    </React.Fragment>
    )
}

export default Book;