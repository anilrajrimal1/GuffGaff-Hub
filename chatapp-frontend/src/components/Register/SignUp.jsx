import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser, register } from '../../Redux/Auth/Action';

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
            navigate("/");
        }
    }, [auth, navigate]);

    return (
        <div className='flex justify-center h-screen items-center'>
            <div className='w-[400px] p-10 shadow-md bg-white rounded-md'>

                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label className='mb-2 block text-gray-600'>Full Name</label>
                        <input type="text" placeholder='Enter your full name' name="fullName" onChange={handleChange} value={inputData.fullName} className='py-2 px-3 w-full outline-none border border-gray-400 rounded-md focus:border-blue-500' required />
                    </div>
                    <div>
                        <label className='mb-2 block text-gray-600'>Email</label>
                        <input type="email" placeholder='Enter your email' name="email" onChange={handleChange} value={inputData.email} className='py-2 px-3 w-full outline-none border border-gray-400 rounded-md focus:border-blue-500' required />
                    </div>
                    <div>
                        <label className='mb-2 block text-gray-600'>Password</label>
                        <input type="password" placeholder='Enter your password' name="password" onChange={handleChange} value={inputData.password} className='py-2 px-3 w-full outline-none border border-gray-400 rounded-md focus:border-blue-500' required />
                    </div>

                    <div>
                        <Button className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300' variant='contained' type='submit'>Sign Up</Button>
                    </div>
                </form>

                <div className='flex items-center mt-5'>
                    <p className='m-0 text-gray-600'>Already have an account?</p>
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
