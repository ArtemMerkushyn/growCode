import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import Moment from 'react-moment';
import { removeComment, updateComment } from '../redux/features/comment/commentSlice.js';
import { AiFillChrome } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import { LiaNode } from "react-icons/lia";
import { BsIncognito } from "react-icons/bs";

export const CommentItem = ({ cmt }) => {
    const { user } = useSelector((state) => state.auth);
    const [ editComment, setEditComment ] = useState(false);
    const [ commentText, setCommentText ] = useState(cmt.comment);
    const dispatch = useDispatch();

    const openFormToEditComment = () => setEditComment(true);

    const removeCommentHandler = () => {
        const commentId = cmt._id;
        dispatch(removeComment({ commentId }));
    }

    const submitEditCommentHandler = async () => {
        try {
            const id = cmt._id;
            const updatedComment  = { commentText };
            await dispatch(updateComment({ id, updatedComment }));
            setEditComment(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const cancelEditHandler = () => {
        setCommentText(cmt.comment);
        setEditComment(false);
    }

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
        <div className='comment'>
            <div className="comment__item">
                <div className="comment__item-info">
                    <Link to={`/user/${cmt.author}`}>
                        <div className="comment__item-info--avatar">
                            {cmt && cmt.profession ? (
                                    getProfessionIcon(cmt.profession)
                                ) : (
                                    <BsIncognito />
                            )}
                        </div>
                        <div className="comment__item-info--username link">{cmt.username}</div>
                    </Link>
                    <div className="comment__item-info--date">
                        <Moment date={cmt.createdAt} format='DD.MM.YY HH:mm'/>
                    </div>
                </div>
                <div className="comment__item-text">
                    {editComment ? (
                        <form
                            onSubmit={e => e.preventDefault()}
                        >
                           <TextareaAutosize
                                spellCheck={false}
                                className='comment-edit__textarea'
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                        </form>
                    ) : (<TextareaAutosize disabled spellCheck={false} value={cmt.comment} />)}
                </div>
            </div>
            {user?._id === cmt.author &&(
                <div className="comment-action__wrapper">
                    {editComment ? (
                        <div>
                            <button className='link' onClick={submitEditCommentHandler}>Оновити</button>
                            <button className='link' onClick={cancelEditHandler}>Відмінити</button>
                        </div>
                        ) : (
                        <div>
                            <button className='link' onClick={openFormToEditComment}>Редагувати</button>
                            <button className='link' onClick={removeCommentHandler}>Видалити</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}