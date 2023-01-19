import { useState, useEffect } from "react";
import axios from "axios";
import urls from "../../static/urls";
import {IRecommandationList} from "./interfaces.jsx"
import RecommendedList from "./recomendedList";

import "./static/recommended.css"
interface IProps {
    userID: string
}

const Discover = ({userID}: IProps) => {
    const [data, setData] = useState<IRecommandationList[]>()
    useEffect(()=> {
        console.log(userID);
        
        axios
            .get("http://localhost:8001/users/get-recommended/" + userID)
            
            .then((res) => {
                console.log(res.data);
                setData(res.data)
            })
            .catch((err) => console.log(err.message))
        console.log(data);
    }, [])
    if (data){
        return (
        <div>
            {data.map((el) => {
                return <div>{<RecommendedList userID = {userID} list = {el}/>}</div>
            })}
        </div>
        )
    } else {
        return <div>Loading...</div>
    }
}

export default Discover;