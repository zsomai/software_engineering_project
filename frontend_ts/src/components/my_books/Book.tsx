import { IBook, IRWish } from "./interface";
import noPicture from "../../not_found.jpeg";
import React, {useState} from "react";
import BackDrop from "../discover/backDrop";
import BookDetailed from "../discover/book-detailed";


interface IDetailed {
    data: IBook
    close: any
}



interface IProps {
    data: IBook;
    userID: string
}



const Book = ({data, userID}:IProps)=>{
    const [popUp, setPopup] = useState<boolean>(false)
    
    return (
        <React.Fragment>
            <div className="recommandation-book" onClick={() => setPopup(true)}>
                <div className="image"><img src= {(data.image)? data.image : noPicture}/></div>
                <div>{data.title}</div>
                <div>{data.author}</div>
            </div>
        {  popUp &&
        <React.Fragment>
            <BackDrop click = {() => setPopup(false)}/>
            <BookDetailed book = {data} userID = {userID} closeAll = {()=>setPopup(false)}/>
        </React.Fragment>
        }
        </React.Fragment>
    )
}

export default Book