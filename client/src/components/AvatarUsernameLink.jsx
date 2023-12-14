import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillChrome } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import { LiaNode } from "react-icons/lia";
import { BsIncognito } from "react-icons/bs";

export const AvatarUsernameLink = ({ about }) => {
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
        <div className="post-item__info-username">
            <div className='userpage__info-avatar'>
                {about && about.profession ? (
                    getProfessionIcon(about.profession)
                ) : (
                    <BsIncognito />
                )}
            </div>
            <div className='userpage__info-username'>
                <Link className='link' to={about && about?.author === user?._id ? `/me` : `/user/${about?.author}`}>
                    {about ? (<div>{about.username}</div>):(<div>загрузка</div>)}
                </Link>
            </div>
        </div>
    );
}