import React, { useState, useEffect } from 'react';
import urls from '../../static/urls';

import axios from "axios";


export default  () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [response, setResponse] = useState(0);

    let signup = () => {

        axios.post(urls.API_BASE_URL + 'users/signup', {
            "email": email,
            "password": password,
            "username": username
        })
            .then((res)  => {
                console.log(res);
                setResponse(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    if (response === 0) {
        return (
            <div className="signup-container">
                <div>Sign up!</div>
                <div className="inputs">
                    <div className="user-input">
                        <div><label>Email: </label><input type="text" onChange={(el) => setEmail(el.target.value)}/>
                        </div>
                    </div>
                    <div className="user-input">
                        <div><label>Username: </label><input type="text"
                                                             onChange={(el) => setUsername(el.target.value)}/></div>
                    </div>
                    <div className="user-input">
                        <div><label>Password: </label><input type="password"
                                                             onChange={(el) => setPassword(el.target.value)}/></div>
                    </div>
                </div>
                <div onClick={() => signup()}>Sign up!</div>
            </div>
        );
    } else {
        return (<div>{response}</div>);
    }
}