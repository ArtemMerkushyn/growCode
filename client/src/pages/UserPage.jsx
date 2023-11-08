import React from 'react';
import { useSelector } from 'react-redux';
import { BsIncognito } from "react-icons/bs";
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from 'react-router-dom';

export const UserPage = () => {
    const user = useSelector((state) => state.auth.user);
    console.log(user)
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
                            <Link to={`/${user._id}/edit/user`}>
                                <AiOutlineSetting/>
                            </Link>
                        </div>
                        <div className="userpage__info-text">
                            <p>
                                <TextareaAutosize value={user.description}/>
                            </p>
                        </div>
                    </div>
                </div>
            ) : (<div>Загрузка</div>)}
        </div>
    );
}
