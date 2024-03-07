import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser, loginUser } from '../../Redux/Auth/Action';

const SignIn = () => {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [inputData, setInputData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { auth } = useSelector((store) => store);

    useEffect(() => {
        if (token) {
            dispatch(currentUser(token));
        }
    }, [token, auth.reqUser, dispatch]);

    useEffect(() => {
        if (auth.reqUser) {
            navigate("/");
        }
    }, [auth, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(inputData));
        setOpenSnackBar(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((values) => ({ ...values, [name]: value }));
    };

    const handleSnackBarClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <div className='flex justify-center h-screen items-center'>
            <div className='w-[400px] p-10 shadow-md bg-gray-200 rounded-md'>

                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label className='mb-2 block text-gray-600'>Email</label>
                        <input type="email" placeholder='Enter your email' name="email" onChange={handleChange} value={inputData.email} className='py-2 px-3 w-full outline-none border border-gray-400 rounded-md focus:border-blue-500' required />
                    </div>
                    <div>
                        <label className='mb-2 block text-gray-600'>Password</label>
                        <input type="password" placeholder='Enter your password' name="password" onChange={handleChange} value={inputData.password} className='py-2 px-3 w-full outline-none border border-gray-400 rounded-md focus:border-blue-500' required />
                    </div>

                    <div>
                        <Button className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300' variant='contained' type='submit'>Sign in</Button>
                    </div>
                </form>

                <div className='flex items-center mt-5'>
                    <p className='m-0 text-gray-600'>Don't have an Account?</p>
                    <Button className='text-blue-500 hover:underline ml-1' variant='text' onClick={() => navigate("/signup")}>Register</Button>
                </div>

            </div>

            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
                    Login Successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};
export default SignIn;
