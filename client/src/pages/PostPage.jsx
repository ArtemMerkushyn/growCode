import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios.js';
import Moment from 'react-moment';
import TextareaAutosize from 'react-textarea-autosize';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import { AiFillChrome } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import { LiaNode } from "react-icons/lia";
import { BsIncognito } from "react-icons/bs";
import { useSelector } from 'react-redux';

export const PostPage = () => {
    const [post, setPost] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const params = useParams();

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
        setPost(data);
    }, [params.id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

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

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        );
    }

    return (
        <div className='post-page'>
            <div className='post-item'>
                <div className="post-item__img">
                    {post.imgUrl ? (
                        <img src={post.imgUrl} alt="img"/>
                    ) : null}
                </div> 
                <div className="post-item__info">
                    <div className="post-item__info-username">
                        <div className='userpage__info-avatar'>
                            {user && user.profession ? (
                                getProfessionIcon(user.profession)
                            ) : (
                                <BsIncognito />
                            )}
                        </div>
                        <div className='userpage__info-username'>
                            {user ? (<div>{user.username}</div>):(<div>загрузка</div>)}
                        </div>
                    </div>
                    <div className="post-item__date">
                        <Moment date={post.createdAt} format='DD.MM.YY HH:mm'/>
                    </div>
                </div>
                <div className=" post-item__title title-post">{post.title}</div>
                <div className="post-item__text cropped"> 
                    <TextareaAutosize
                        disabled 
                        spellCheck={false}
                        value={post.text}
                    />
                </div>
                <div className="post-item__action">
                    <div className='post-item__counter'>
                        <button className='post-item__counter-btn'>
                            <AiFillEye/><span>{post.views}</span>
                        </button>
                        <button className='post-item__counter-btn'>
                            <AiOutlineMessage />{' '}
                            <span>{post.comments?.length || 0} </span>
                        </button>
                    </div>
                    {user?._id === post.author && (
                        <div className="post-item__action-btns">
                            <Link to={`/${params.id}/edit`}>
                                <div className='link'>Редагувати</div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="popular-posts">
                <h3 className="title1">Популярні пости</h3>
            </div>
        </div>
    );
}
