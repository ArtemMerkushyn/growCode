import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice.js';
import { toast } from 'react-toastify';

export const RegisterPage = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const { status } = useSelector((state) => state.auth);
    const isAuth = useSelector(checkIsAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        try {
            dispatch(registerUser({ username, password }));
            setUsername('');
            setPassword('');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(status) toast(status);
        if(isAuth) {
            navigate('/me');
            window.location.reload();
        }
    }, [status, isAuth, navigate]);

    return (
        <form className='form' onSubmit={(e) => e.preventDefault()}>
            <h2 className='form__title'>Реєстрація</h2>
            <label className='form__item'>
                <input 
                    type="text"
                    placeholder="Ім'я користувача" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label className='form__item'>
                <input 
                    type="password"
                    placeholder="Пароль" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <div className="form__item">
                <button 
                    className='btn1' 
                    type='submit'
                    onClick={handleSubmit}
                >
                    Зареєструватися
                </button>
                <Link className='link' to={'/login'} >У мене вже є обліковий запис</Link>
            </div>
        </form>
    );
}