import React from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';

export const CountItem = ({about}) => {
    return (
        <div className='count'>
            <div className='count__item'>
                <AiFillEye className='fs'/><span>{about.views}</span>
            </div>
            <div className='count__item'>
                <AiOutlineMessage />{' '}
                <span>0</span>
            </div>
        </div>
    );
}