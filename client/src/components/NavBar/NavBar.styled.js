import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

export const Header = styled.header`
    padding: 5px;
    font-weight: 600;
    text-transform: uppercase;
    background: #002F34;
    margin-bottom: 20px;
    
    a:not(:first-child) {
        text-decoration: none;
        color: #fff;
    }
`;

export const Container = styled.div`
    max-width: 1024px;
    margin: 0 auto;
`;

export const Items = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const NavItems = styled.nav`
    display: flex;
    align-items: center;
    gap: 14px;
`;

export const Logo = styled(NavLink)`
    font-size: 20px;
    line-height: 20px;
    background: #fff;
    padding: 5px 10px;
    border-radius: 10px;
    font-weight: 700;
    text-transform: none;
    color: #002F34;
    transition: all .2s linear;

    &:hover {
        -webkit-text-stroke: 1px #002F34;
        text-stroke: 1px #002F34;
        color: transparent;
    }

    &.active {
        -webkit-text-stroke: 1px #002F34;
        text-stroke: 1px #002F34;
        color: transparent;
    }
`;

export const NavItem = styled(NavLink)`
    &:not(:first-child),
    & {
        position: relative;
        overflow: hidden;
        padding: 2px 0;
        color: #fff;
    }

    &:not(:first-child)::before,
    &::before {
        content: '';
        width: 100%;
        height: 1.2px;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(101%);
        transition: all .2s linear;
    }

    &:not(:first-child)::after,
    &::after {
        content: '';
        width: 100%;
        height: 1.2px;
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateX(-101%) !important;
        transition: all .2s linear;
    }

    &:not(:first-child):hover::before,
    &:hover::before,
    &:not(:first-child):hover::after,
    &:hover::after {
        transform: translateX(0%) !important;
    }

    &.active::before,
    &.active::before,
    &.active::after,
    &.active::after {
        transform: translateX(0%) !important;
    }

    svg {
        fill: #fff;
    }
`;

export const NavItemLink = styled(Link)`
    &:not(:first-child),
    & {
        position: relative;
        overflow: hidden;
        padding: 2px 0;
        color: #fff;
    }

    &:not(:first-child)::before,
    &::before {
        content: '';
        width: 100%;
        height: 1.2px;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(101%);
        transition: all .2s linear;
    }

    &:not(:first-child)::after,
    &::after {
        content: '';
        width: 100%;
        height: 1.2px;
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateX(-101%) !important;
        transition: all .2s linear;
    }

    &:not(:first-child):hover::before,
    &:hover::before,
    &:not(:first-child):hover::after,
    &:hover::after {
        transform: translateX(0%) !important;
    }

    &.active::before,
    &.active::before,
    &.active::after,
    &.active::after {
        transform: translateX(0%) !important;
    }

    svg {
        fill: #fff;
    }
`;

export const Auth = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    a {
        max-height: 22px;
    }

    svg {
        font-size: 18px;
        line-height: 18px;
        font-weight: 500;
    }
`;