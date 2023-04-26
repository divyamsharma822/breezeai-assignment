import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ReactComponent as Logoutlogo } from "../../assets/img/logout.svg";
import { logout, selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import "./Dashboard.css";

const Dashboard = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                dispatch(logout());
                navigate("/");
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className='dashboard bg-slate-200 min-h-screen flex items-center justify-center mx-2'>
            {user ? (
                <div className='flex flex-col items-center justify-between bg-slate-700 p-5 text-white rounded gap-2'>
                    <div className='flex justify-between items-center text-white rounded w-full mb-2'>
                        <div>Login Successful</div>
                        <Logoutlogo
                            style={{ cursor: "pointer" }}
                            onClick={handleSignout}
                            title="logout"
                        />
                    </div>
                    <div className='bg-slate-600 rounded-b-lg p-5 text-center'>
                        Hello world, Have a good day 😊❤️
                    </div>
                </div>
            ) : (
                <div className='flex flex-col w-full sm:w-1/2 mx-2 gap-2'>
                    <div className='flex justify-between items-center bg-slate-700 p-5 h-1/2 text-white rounded'>
                        <div>Login to view Content</div>
                        <button
                            className='bg-cyan-700 hover:bg-cyan-900 py-1 px-2 rounded'
                            onClick={() => navigate("/")}>
                            Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
