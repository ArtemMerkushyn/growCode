import React from 'react';
import Moment from 'react-moment';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { AiFillChrome } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import { LiaNode } from "react-icons/lia";
import { BsIncognito } from "react-icons/bs";
import { useSelector } from 'react-redux';

export const PostItem = ({ post }) => {
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
        <div className='post-item'>
            <Link to={`/${post._id}`}>
                <div className="post-item__img">
                    {post.imgUrl ? (
                        <img src={post.imgUrl} alt="img"/>
                    ) : null}
                </div> 
            </Link>
            <div className="post-item__info">
                <div className="post-item__info-username">
                    <div className='userpage__info-avatar'>
                        {post.profession ? (
                            getProfessionIcon(post.profession)
                        ) : (
                            <BsIncognito />
                        )}
                    </div>
                    <div className='userpage__info-username'>
                        <Link className='link' to={post && post?.author === user?._id ? `/me` : `/user/${post?.author}`}>
                            {post ? (<div>{post.username}</div>):(<div>загрузка</div>)}
                        </Link>
                    </div>
                </div>
                <div className="post-item__date">
                    <Moment date={post.createdAt} format='DD.MM.YY HH:mm'/>
                </div>
            </div>
            <Link to={`/${post._id}`}>
                <div className=" post-item__title title-post">{post.title}</div>
            </Link>
            <Link to={`/${post._id}`}>
                <div className="post-item__text cropped"> 
                    <TextareaAutosize
                        disabled 
                        spellCheck={false}
                        value={post.text}
                    />
                </div>
            </Link>
            <div className='post-item__counter'>
                <button className='post-item__counter-btn'>
                    <AiFillEye/><span>{post.views}</span>
                </button>
                <button className='post-item__counter-btn'>
                    <AiOutlineMessage />{' '}
                    <span>{post.comments?.length || 0} </span>
                </button>
            </div>
        </div>
    );
}