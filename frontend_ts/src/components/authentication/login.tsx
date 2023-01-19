import React, { useState, useEffect } from 'react';
import urls from '../../static/urls';


import axios from "axios";

import "./static/authentication.css";
import { rmSync } from 'fs';

interface IProps {
    setID: any
}

export default  ({setID}: IProps) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    let login = () => {
        console.log(email, password)
        axios.post(urls.API_BASE_URL + "users/authentication", {
            "email": email,
            "password": password
        })
        .then( (res) => {
            console.log(res);
            if(res.data.id)setID(res.data.id)
        })
        .catch( (error) => {
                console.log(error);
        });
    }

    return (
        <div className="login-container">
            <div className="user-input"><div><label>Email: </label><input type="text" onChange={(el) => setEmail(el.target.value)}/></div></div>
            <div className="user-input"><div><label>Password: </label><input type="password" onChange={(el) => setPassword(el.target.value)}/></div></div>
            <div onClick={()=>login()}>Login to your account</div>
            <div>Sign up now!</div>
        </div>
    );
}