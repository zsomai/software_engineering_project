import "./static/navbar.css";

import { Link } from "react-router-dom";

export default () => {
    return (
        <nav>
            <Link to="">Home</Link>
            <Link to="/discover">Discover new books</Link>
            <Link to="/mybooks">My books</Link>
            <Link to="/dashboard">Some interesting data</Link>
        </nav>
    );
}