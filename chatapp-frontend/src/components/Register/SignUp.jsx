import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser, register } from '../../Redux/Auth/Action';
import backgroundImage from './backgroundImage.jpg';

const SignUp = () => {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [inputData, setInputData] = useState({ fullName: "", email: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token && !auth.reqUser) {
            dispatch(currentUser(token));
        }
    }, [token, auth.reqUser, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenSnackBar(true);
        console.log("Form Submitted", inputData);
        dispatch(register(inputData));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((values) => ({ ...values, [name]: value }));
    };

    const handleSnackBarClose = () => {
        setOpenSnackBar(false);
    };

    useEffect(() => {
        if (auth.reqUser?.fullName) {
            navigate("/signin");
        }
    }, [auth, navigate]);

    return (
        <div
            className='flex items-center justify-center h-screen'
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='flex flex-col items-start justify-center w-[400px] p-10 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md'>
                <h1 className='text-5xl text-white font-semibold mb-5'>Sign Up</h1>
                <p className='text-white mb-8'>Ready to chat? Sign up now and start connecting!</p>
            </div>

            <div className='w-[400px] p-10 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md'>
                <h2 className='text-center text-3xl mb-5 font-extrabold text-white'>Guff Gaff Hub</h2>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label className='mb-2 block text-white'>Full Name</label>
                        <input type="text" placeholder='Enter your full name' name="fullName" onChange={handleChange} value={inputData.fullName} className='py-2 px-3 w-full outline-none border border-white rounded-md focus:border-blue-500 text-black' required />
                    </div>
                    <div>
                        <label className='mb-2 block text-white'>Email</label>
                        <input type="email" placeholder='Enter your email' name="email" onChange={handleChange} value={inputData.email} className='py-2 px-3 w-full outline-none border border-white rounded-md focus:border-blue-500 text-black' required />
                    </div>
                    <div>
                        <label className='mb-2 block text-white'>Password</label>
                        <input type="password" placeholder='Enter your password' name="password" onChange={handleChange} value={inputData.password} className='py-2 px-3 w-full outline-none border border-white rounded-md focus:border-blue-500 text-black' required />
                    </div>
                    <div>
                        <Button className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300' variant='contained' type='submit'>Sign Up</Button>
                    </div>
                </form>
                <div className='flex items-center mt-5'>
                    <p className='m-0 text-white'>Already have an Account?</p>
                    <Button className='text-blue-500 hover:underline ml-1' variant='text' onClick={() => navigate("/signin")}>Login</Button>
                </div>
            </div>

            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
                    Your account has been successfully created!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SignUp;
