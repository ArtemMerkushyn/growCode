import React from 'react';
import Moment from 'react-moment';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { AvatarUsernameLink } from './AvatarUsernameLink/AvatarUsernameLink.jsx';

export const PostItem = ({ post }) => {  
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
                <AvatarUsernameLink about={post}/>
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