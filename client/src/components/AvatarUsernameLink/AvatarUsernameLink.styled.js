import styled from "styled-components";

export const Username = styled.div`
    position: relative;
    text-decoration: none;
    color: #002F34;
    font-size: 16px;
    line-height: 22px;
    font-weight: 700;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 100%;
        border-radius: 50px;
        background: #002F34;
        transform: translateX(-100%);
        transition: all .2s linear;
    }
    
`;

export const Avatar = styled.div`
    width: 30px;
    height: 30px;
    background: #427D9D;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 70%;
        height: 70%;
        fill: #fff;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover ${Username}::before {
        transform: translateX(0%);
    }
`;
