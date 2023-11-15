import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsIncognito } from "react-icons/bs";
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineSetting, AiFillChrome } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import { LiaNode } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { getMyPosts } from '../redux/features/post/postSlice.js';
import { MyPostItem } from '../components/MyPostItem.jsx';

export const MyPage = () => {
    const user = useSelector((state) => state.auth.user);
    const posts = useSelector((state) => state.post.posts);
    const loading = useSelector((state) => state.post.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyPosts());
    }, [dispatch]);

    //сортую поти по даті(нові будуть вище)
    const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

    if (loading) {
        return <div>Загрузка...</div>;
    }
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

            <div className="userpage-container">
                <div className="userpage__posts">
                    <div className="userpage__posts-header">
                        <h3 className='title1'>Мої пости</h3>
                        <Link to={'/add/posts'}><div className='add'></div></Link>
                    </div>
                    <div className="userpage__posts-container">
                        {sortedPosts?.map((post, idx) => {
                            return <MyPostItem post={post} key={idx}/>
                        })}
                    </div>
                </div>
                <div className="userpage__questions">
                    <h3 className='title1'>Мої питання</h3>
                </div>
            </div>
        </div>
    );
}