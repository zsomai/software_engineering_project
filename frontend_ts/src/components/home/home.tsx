import { useEffect, useState } from "react"
import urls from "../../static/urls"
import axios from "axios"
import Book from "../my_books/Book"
import { IBook } from "../discover/interfaces"

import "./static/style.css";


interface IProps {
    id: string
}



const HomePage = ({id}: IProps) => {
    const [data, setData] = useState<IBook[]>([])
    const [searchStr, setSearchStr] = useState<string>("")

    const handleSearch = () => {
        axios
        .get(urls.API_GET_SEARCH + searchStr)
        .then((res) => setData(res.data))
    }


    return (
        <div>
            <div><input placeholder="title author or category" onChange={(e)=>{setSearchStr(e.target.value)}}/><div onClick={() => handleSearch()}>Search</div></div>
            <div className="grid">{data.map((d) => {return <Book data={d} userID = {id}/>})}</div>
        </div>
    )



}

export default HomePage