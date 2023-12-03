import axios from '../utils/axios.js';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import {  AiFillChrome } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import { LiaNode } from "react-icons/lia";
import { BsIncognito } from "react-icons/bs";
import { UserPostsItem } from '../components/UserPostItem.jsx';
import { UserQueryItem } from '../components/UserQueryItem.jsx';

export const UserPage = () => {
    const [ userInfo, setUserInfo ] = useState(null);
    const [ posts, setPosts ] = useState([]);
    const [ queries, setQueries ] = useState([]);
    const { id } = useParams();

    const fetchUserPosts = useCallback(async() => {
        try {
            const { data } = await axios.get(`/posts/${id}/posts`);
            setUserInfo(data.user);
            const sortedPosts = data.list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPosts(sortedPosts);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    const fetchUserQueries = useCallback(async () => {
        try {
            const { data } = await axios.get(`/queries/${id}/queries`);
            const sortedQueries = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setQueries(sortedQueries);
        } catch (error) {
            console.log(error);
        }
    }, [id]);
    
    useEffect(() => {
        fetchUserPosts();
    }, [fetchUserPosts]);

    useEffect(() => {
        fetchUserQueries()
    }, [fetchUserQueries]);

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
            {userInfo ? (
                <div className='userpage__info'>
                    <div className='userpage__info-avatar'>
                        {getProfessionIcon(userInfo.profession)}
                    </div>
                    <div className="userpage__info-description">
                        <div className="userpage__info-username">
                            {userInfo.username}
                        </div>
                        <div className="userpage__info-tags">
                            {userInfo.profession ? (
                                <span>{userInfo.profession}</span>
                                ) : ( <div></div>)
                            }
                            {userInfo.level ? (
                                <span>{userInfo.level}</span>
                                ) : ( <div></div>)
                            }
                        </div>
                        <div className="userpage__info-text">
                            {userInfo.description ? (
                                <TextareaAutosize value={userInfo.description}/>
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
                        <h3 className='title1'>Блог</h3>
                    </div>
                    <div className="userpage__posts-container">
                        {posts?.map((post, idx) => {
                            return <UserPostsItem post={post} key={idx}/>
                        })}
                    </div>
                </div>
                <div className="userpage__forum">
                    <div className="userpage__forum-header">
                        <h3 className='title1'>Форум</h3>
                    </div>
                    {queries?.map((query, idx) => {
                        return <UserQueryItem key={idx} query={query} />
                    })}
                </div>
            </div>
        </div>
    );
}