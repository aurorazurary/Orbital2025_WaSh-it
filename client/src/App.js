import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './App.css';
import Booking from "./pages/Booking";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import UserInfo from "./pages/UserInfo"

function App() {
    return (
        <div className="container">
            <Router>
                <Routes>
                    <Route path="/" element = {<Main />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-email/:token" element={<VerifyEmail />} />
                    <Route path="/booking/:machineId" element={<Booking />} />
                    <Route path="/userinfo" element={<UserInfo />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;