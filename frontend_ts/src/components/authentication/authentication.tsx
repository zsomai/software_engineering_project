import React, { useState } from 'react';
import Login from "./login";
import Register from "./Register";

import "./static/authentication.css";

interface IProps {
    setUserID: any
}

const LoginPage = ({setUserID}: IProps) => {
    const [currentPage, setCurrentPage] = useState<string>("Login");
    return (
        <div className="authentication-container">
            <div className="button-bar">
                <div onClick={()=>setCurrentPage("Login")}>Login</div>
                <div onClick={() => setCurrentPage("Register")}>Sign up</div>
            </div>
            {currentPage === "Login" && <Login setID = {(id: any) => setUserID(id)}/>}
            {currentPage === "Register" && <Register />}
        </div>

    );
}


export default LoginPage;