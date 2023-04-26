import React from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import { selectUser } from "../src/features/userSlice";
import { Routes, Route } from "react-router-dom";

const App = () => {
    const user = useSelector(selectUser);
    console.log(user);

    return (
        <>
            <React.Suspense
                fallback={<div className='text-center'>Loading...</div>}>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path='/dashboard' exact element={<Dashboard />} />
                </Routes>
            </React.Suspense>
        </>
    );
};

export default App;
