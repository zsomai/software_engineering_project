import { IRReading } from "./interface";
import noPicture from "../../not_found.jpeg"
import urls from "../../static/urls";
import axios from "axios";
import React, { useState } from "react";
import BackDrop from "../discover/backDrop";

interface IProps {
    data: IRReading
    reloadReading: any
    reloadDone: any
    userID: string
}

interface IComment {
    userID: string
    bookID: string
    close: any
    reloadDone:any
    reloadReading:any
}
const Comment = ({userID, bookID, close, reloadDone, reloadReading}:IComment) => {
    const [comment, setComment] = useState<string>()

    const send = async () => {
        if(comment)
            axios.patch(urls.API_ADD_COMMENT + bookID, 
                {
                    userID: userID,
                    comment: comment
                })
        close()
        await reloadDone()
        await reloadReading()
    }

    return (
        <div className="detail-view">
            <label>Please write your opinion about the book you have finished</label><textarea onChange={(e) =>{ setComment(e.target.value)}} ></textarea>
            <div onClick={() => send()}>Send comment</div>
        </div>
    )
}
interface IProg {
    bookID: string
    close: any
    userID: string
    reloadReading: any
}


const UpgradeProgress = ({bookID, close, userID, reloadReading}:IProg) => {
    const [page, setPage] = useState<number>()
    const handleSave = async () => {
        await axios.patch(urls.API_ADD_READING_URL + userID, {id: bookID, pageNum: page}).catch((err) => console.log(err.message))
        await reloadReading()
        close()
    }
    return (
        <div className="detail-view">
            <input type={"number"} placeholder="pages" onChange={(e)=> {setPage(parseInt(e.target.value))}} />
            <div onClick={() => handleSave()} className="button">Save</div>
        </div>
    )
    
}

const BookReading = ({data, reloadDone, reloadReading, userID}:IProps)=>{
    const [popUp, setPopup] = useState<boolean>(false)
    const [popUp2, setPopup2] = useState<boolean>(false)
    const click = async() => {
        axios.patch(urls.API_REMOVE_READING_URL + "63a7099b2abcfa4b5c790f8d",{id:data.book._id})
        axios.patch(urls.API_ADD_DONE_URL + "63a7099b2abcfa4b5c790f8d",{bookID:data.book._id})
        setPopup(true)

    }

    return (
        <React.Fragment>
        <div>
            <div className="recommandation-book">
                <div className="image"><img src= {(data.book.image)? data.book.image : noPicture}/></div>
                <div>{data.book.title}</div>
                <div>{data.book.author}</div>
                <div>Read {data.pagesRead} pages of {data.totalPages}</div>
                <div className="button" onClick={() => setPopup2(true)}>Update Progress</div>
                <div className="button" onClick={() => click()}>I finished the book</div>
            </div>
        </div>
        {popUp && 
            <React.Fragment>
                <Comment reloadDone={() => reloadDone()} reloadReading={() => reloadReading()} bookID={data.book._id} userID={userID} close={() => setPopup(false)}/>
                <BackDrop click={() => setPopup(false)} />
            </React.Fragment>
        }
        {popUp2 &&
            <React.Fragment>
                <UpgradeProgress bookID={data.book._id} userID={userID} close={() => setPopup2(false)} reloadReading = {() => reloadReading()} />
                <BackDrop click={() => setPopup2(false)} />
            </React.Fragment>
        }
        </React.Fragment>
    )
}

export default BookReading