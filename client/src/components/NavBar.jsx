import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
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
                    <div className="navbar__auth">
                        <NavLink to={'login'}>Увійти</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}