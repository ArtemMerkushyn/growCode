import React from 'react';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
    return (
        <form className='form' onSubmit={(e) => e.preventDefault()}>
            <h2 className='form__title'>Авторизація</h2>
            <label className='form__item'>
                <input 
                    type="text"
                    placeholder="Ім'я користувача" 
                />
            </label>
            <label className='form__item'>
                <input 
                    type="password"
                    placeholder="Пароль" 
                />
            </label>
            <div className="form__item">
                <button 
                    className='form__btn' 
                    type='submit'
                >
                    Увійти
                </button>
                <Link className='link' to={'/register'} >Не маю облікового запису</Link>
            </div>
        </form>
    );
}