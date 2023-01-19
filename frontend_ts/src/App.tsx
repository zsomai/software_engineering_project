import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import urls from "./static/urls";

import logo from './logo.svg';
import './App.css';

// import Authentication from "./components/authentication/authentication";
import NavBar from "./components/mix/NavBar";
import DashBoard from "./components/dashboard/main";
import Discover from "./components/discover/discover";
import MyBooks from "./components/my_books/MyBooks";
import LoginPage from "./components/authentication/authentication";
import Home from "./components/home/home";
import { application } from "express";
import { SetStateAction, useState } from "react";


function App() {
  const [userid, setUserId] = useState<string>();

  if(userid)
    return (
        <div className="App">
          <Router>
            <NavBar />
            <Routes>
              <Route path="" element={<Home id ={userid}/>}/>
              <Route path="/mybooks" element={<MyBooks userID={userid} wishlistLink={urls.API_GET_WISHLIST_URL + userid} readingLink={urls.API_GET_READING_URL + userid} readLink={urls.API_GET_READ_URL + userid}/>}/>
              <Route path="/discover" element={<Discover userID = {userid}/>}/>
              <Route path="/dashboard" element={<DashBoard  userID={userid}/>}/>
            </Routes>
          </Router>
        </div>
    );

  else{
    return <div className="App"><LoginPage setUserID={(id: SetStateAction<string | undefined>) => setUserId(id)}/></div>
  }
}

export default App;
