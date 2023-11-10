import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice.js';
import { toast } from 'react-toastify';

export const LoginPage = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const { status } = useSelector((state) => state.auth);
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(status) toast(status);
        if(isAuth) navigate('/');
    }, [status, isAuth, navigate]);

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ username, password }));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className='form' onSubmit={(e) => e.preventDefault()}>
            <h2 className='form__title'>Авторизація</h2>
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
                    Увійти
                </button>
                <Link className='link' to={'/register'} >Не маю облікового запису</Link>
            </div>
        </form>
    );
}