import styled from 'styled-components';

export const CancelBtn = styled.button`
    width: 22px;
    height: 22px;
    background: transparent;

    &:hover svg {
        fill: #9BBEC8;
    }

    svg {
        width: 100%;
        height: 100%;
        fill: #002F34;
        transition: all .1s linear;
    }
`;