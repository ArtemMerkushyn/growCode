import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkIsAuth, logout } from '../../redux/features/auth/authSlice.js';
import { toast } from 'react-toastify';
import { BiUser } from "react-icons/bi";
import { Auth, Container, Header, Items, Logo, NavItem, NavItemLink, NavItems } from './NavBar.styled.js';

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
        <Header>
            <Container>
                <Items>
                    <NavItems>
                        <Logo to={'/'}>growCode</Logo>
                        <NavItem to={'blog'}>Блог</NavItem>
                        <NavItem to={'forum'}>Форум</NavItem>
                        <NavItem to={'vacancies'}>Вакансії</NavItem>
                        <NavItem to={'projects'}>Проекти</NavItem>
                    </NavItems>
                    {isAuth ? (
                        <Auth>
                            <NavItem to={'me'}>
                                <BiUser/>
                            </NavItem>
                            <NavItemLink to={'/'} onClick={logoutHandler}>Вийти</NavItemLink>
                        </Auth>
                        ):(
                            <Auth>
                                <NavItem to={'login'}>Увійти</NavItem>
                            </Auth>
                        )
                    }
                </Items>
            </Container>
        </Header>
    );
}