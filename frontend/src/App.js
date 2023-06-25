import React from "react";
import "./style.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from "./Logos/icon.png";
import Login from './Pages/Login';

import Singup from "./Pages/Singup";
import CreatePost from "./Pages/CreatePost";
import AllPosts from "./Pages/AllPosts";
/**
 * nav will show on every page.
 * if an element is outside of `Routes` but inside of Router
 * it will be displayed on every page in the application.
 */
function App() {
    return <Router>
        <nav className="nav-container">
            <Link to="/users/signup">Singup</Link>
            <Link to="/users/login">Login</Link>
            <Link to="/post">CreatePost</Link>
            <Link to="/">AllPosts</Link>
            <img src={logo} alt="Logo" />
        </nav>
        <Routes>
            <Route path="/users/signup" element={<Singup />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/post" element={<CreatePost />} />
            <Route  path="/" element={<AllPosts />} />
        </Routes>

    </Router>
}

export default App;
