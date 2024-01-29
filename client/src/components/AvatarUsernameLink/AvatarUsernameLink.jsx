import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillChrome } from 'react-icons/ai';
import { BiLogoReact } from 'react-icons/bi';
import { LiaNode } from 'react-icons/lia';
import { BsIncognito } from 'react-icons/bs';
import { Avatar, Username, Wrapper } from './AvatarUsernameLink.styled.js';
import PropTypes from 'prop-types';

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
        <Link to={about && about?.author === user?._id ? `/me` : `/user/${about?.author}`}>
            <Wrapper>
                <Avatar>
                    {about && about.profession ? (
                        getProfessionIcon(about.profession)
                    ) : (
                        <BsIncognito />
                    )}
                </Avatar>

                <Username>
                    {about ? <>{about.username}</>:(<>загрузка</>)}
                </Username>
            </Wrapper>
        </Link>
    );
}

AvatarUsernameLink.propTypes = {
    about: PropTypes.object,
}