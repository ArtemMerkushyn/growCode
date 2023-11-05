import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    return (
        <form className='form' onSubmit={(e) => e.preventDefault()}>
            <h2 className='form__title'>Реєстрація</h2>
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
                    className='btn1' 
                    type='submit'
                >
                    Зареєструватися
                </button>
                <Link className='link' to={'/login'} >У мене вже є обліковий запис</Link>
            </div>
        </form>
    );
}