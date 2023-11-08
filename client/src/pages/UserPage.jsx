import React from 'react';
import { useSelector } from 'react-redux';
import { BsIncognito } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from 'react-router-dom';

export const UserPage = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className='userpage'>
            {user ? (
                <div className='userpage__info'>
                    <div className='userpage__info-avatar'>
                        <BsIncognito/>
                    </div>
                    <div className="userpage__info-description">
                        <div className="userpage__info-username">
                            {user.username}
                            <Link to={'edit'}>
                                <AiOutlineSetting/>
                            </Link>
                        </div>
                        <div className="userpage__info-text">
                            <p>
                                Інформація про сторінку користувача відсутня
                            </p>
                        </div>
                    </div>
                </div>
            ) : (<div>Загрузка</div>)}
        </div>
    );
}
