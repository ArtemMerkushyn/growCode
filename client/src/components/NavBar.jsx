import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice.js';
import { toast } from 'react-toastify';
import { BiUser } from "react-icons/bi";

export const NavBar = () => {
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
        navigate('/');
        toast('Ви успішно вийшли');
    }
    return (
        <div className='navbar'>
            <div className="container">
                <div className="navbar__items">
                    <div className="navbar__navigate">
                        <NavLink className='logo__link' to={'/'}>
                            <div className="logo">growCode</div>
                        </NavLink>
                        <NavLink to={'blog'} >Блог</NavLink>
                        <NavLink to={'forum'} >Форум</NavLink>
                        <NavLink to={'vacancies'} >Вакансії</NavLink>
                        <NavLink to={'projects'} >Проекти</NavLink>
                    </div>
                    {isAuth ? (
                        <div className="navbar__auth">
                            <NavLink to={'user'}>
                                <BiUser/>
                            </NavLink>
                            <Link to={'/'} onClick={logoutHandler}>Вийти</Link>
                        </div>
                        ):(
                            <div className="navbar__auth">
                                <NavLink to={'login'}>Увійти</NavLink>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}