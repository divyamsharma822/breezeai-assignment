import React, { useState } from "react";
import banner from "../../assets/img/4204968.jpg";
import googleLogo from "../../assets/img/google.svg";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import Loader from "../Loader/Loader";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                dispatch(
                    login({
                        email: userCredential.user.email,
                        uid: userCredential.user.uid,
                    })
                );
                setLoading(false);
                navigate("/dashboard");
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.message);
                alert("Account Not Found, SignUp First.");
            });
    };

    const handleSignUp = () => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in

                dispatch(
                    login({
                        email: userCredential.user.email,
                        uid: userCredential.user.uid,
                    })
                );
                setLoading(false);
                navigate("/dashboard");
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.message);
                alert("Login Failed. Try Again");
            });
    };

    const handleLoginWithGoogle = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                dispatch(
                    login({
                        email: result.user.email,
                        uid: result.user.uid,
                    })
                );
                setLoading(false);
                navigate("/dashboard");
            })
            .catch((error) => {
                setLoading(false);
                console.log("Login Failed. Try Again");
                alert(error.message);
            });
    };

    return (
        <>
            {isLoading && <Loader />}

            <div className='login'>
                <div className='login-container flex items-center justify-between min-w-fit max-w-[800px] max-h-min bg-white rounded-lg p-4 mx-3'>
                    <div className='left hidden md:flex items-center justify-center'>
                        <img
                            src={banner}
                            alt=''
                            className='object-contain h-[350px] min-w-[100px] inset-0'
                        />
                    </div>
                    <div className='right flex items-center md:mx-5 my-4'>
                        <form className='flex flex-col items-center gap-2'>
                            <h1 className='text-[#1766c2] text-[30px]'>
                                Welcome
                            </h1>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                                className='border-zinc-300 rounded-[5px] border-2 px-3 py-1 w-full text-sm placeholder-gray-400'
                                pattern='/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/'
                                required
                            />
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                className='border-zinc-300 rounded-[5px] border-2 px-3 py-1 text-sm'
                                required
                            />
                            <div className='button-group flex w-full gap-2'>
                                <button
                                    type='submit'
                                    className='w-1/2 bg-[#1767c2] hover:bg-[#1767c2a8] text-white rounded text-sm py-0.5 cursor-pointer'
                                    onClick={handleLogin}>
                                    LogIn
                                </button>
                                <button
                                    type='button'
                                    className='w-1/2 text-[#1767c2] hover:bg-[#74a2cf31] border-2 rounded text-sm border-[#1767c2] cursor-pointer'
                                    onClick={handleSignUp}>
                                    Sign Up
                                </button>
                            </div>
                            <h2>
                                <span>or</span>
                            </h2>
                            <button
                                type='button'
                                className='flex gap-2 border-zinc-300/2 px-4 py-1 rounded-[20px] border-2'
                                onClick={handleLoginWithGoogle}>
                                <img src={googleLogo} alt='' />
                                <div className='text-sm cursor-pointer'>
                                    Continue with Google
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
