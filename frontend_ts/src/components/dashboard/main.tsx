import { useState } from "react";

import BarChart from "./BarChart";
import DonutChart from "./donutChart";
import "./static/main.css";
import urls from "../../static/urls";
import axios from "axios";

interface IProps {
    userID: string
}

export default ({userID}:IProps) => {
    const [daily, setDaily] = useState<number>(NaN)
    const [yearly, setYearly] = useState<number>(NaN)
    const updateGoals = () => {
        console.log("asdasd");
        
        axios.patch(urls.API_UPDATE_GOALS_URL+userID, {"dailyGoal": daily, "yearlyGoal": yearly })
    }
    return (
    <div className="dashboard-container">
        <div>
            <div className="title"> Update your goals:</div>
            <div>
                <label>New daily goal: </label><input onChange={(e) => {setDaily(Number(e.target.value))}} type="number"/>
                <label>New yearly goal: </label><input onChange={(e) => {setYearly(Number(e.target.value))}} type="number"/>
                <div className="button" onClick={()=> updateGoals()}>Update</div>
            </div>
        </div>
        <div>
            <div className="title">Books you've read this year: </div>
            <DonutChart size={300} data_url = {urls.API_GET_CATEGORIES_URL + userID}/>
        </div>
        <div>
            <div className="title">Your daily reading history: </div>
            <BarChart width = {1300} height = {200} dataUrl={"http://localhost:8001/users/get-daily-report/" + userID}/>
        </div>
    </div>
    );
}