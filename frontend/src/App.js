import React from "react";
import "./style.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './Pages/Login';

import Singup from "./Pages/Singup";
/**
 * nav will show on every page.
 * if an element is outside of `Routes` but inside of Router
 * it will be displayed on every page in the application.
 */
function App() {
    return <Router>
        <nav>
            <Link to="/users/signup">Singup</Link>
            <Link to="/users/login">Login</Link>

        </nav>
        <Routes>
            <Route path="/users/signup" element={<Singup />} />
            <Route path="/users/login" element={<Login />} />

        </Routes>

    </Router>
}

export default App;
