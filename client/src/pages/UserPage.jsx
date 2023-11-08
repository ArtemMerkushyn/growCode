import React from 'react';
import { useSelector } from 'react-redux';
import { BsIncognito } from "react-icons/bs";
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineSetting, AiFillChrome } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import { LiaNode } from "react-icons/lia";
import { Link } from 'react-router-dom';

export const UserPage = () => {
    const user = useSelector((state) => state.auth.user);

    const getProfessionIcon = (profession) => {
        switch (profession) {
            case 'front-end developer':
                return <BiLogoReact />;
            case 'backend developer':
                return <LiaNode />;
            case 'full-stack developer':
                return <AiFillChrome />;
            default:
                return <BsIncognito />;
        }
    };
    
    return (
        <div className='userpage'>
            {user ? (
                <div className='userpage__info'>
                    <div className='userpage__info-avatar'>
                        {getProfessionIcon(user.profession)}
                    </div>
                    <div className="userpage__info-description">
                        <div className="userpage__info-username">
                            {user.username}
                            <Link to={`/${user._id}/edit/user`}>
                                <AiOutlineSetting/>
                            </Link>
                        </div>
                        <div className="userpage__info-tags">
                            {user.profession ? (
                                <span>{user.profession}</span>
                                ) : ( <div></div>)
                            }
                            {user.level ? (
                                <span>{user.level}</span>
                                ) : ( <div></div>)
                            }
                        </div>
                        <div className="userpage__info-text">
                            {user.description ? (
                                <TextareaAutosize value={user.description}/>
                                ) : (
                                    <p>Інформація про сторінку користувача відсутня</p>
                                )
                            }
                              
                        </div>
                    </div>
                </div>
            ) : (<div>Загрузка</div>)}
        </div>
    );
}