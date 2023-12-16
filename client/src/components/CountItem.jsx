import React from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';

export const CountItem = ({about}) => {
    const countValue = about.comments !== undefined ? about.comments?.length || 0 : about.replies !== undefined ? about.replies?.length : 0;

    return (
        <div className='count'>
            <div className='count__item'>
                <AiFillEye className='fs'/><span>{about.views}</span>
            </div>
            <div className='count__item'>
                <AiOutlineMessage />{' '}
                <span>{countValue}</span>
            </div>
        </div>
    );
}