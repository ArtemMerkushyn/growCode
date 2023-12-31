import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import Moment from 'react-moment';
import { removeComment, updateComment } from '../redux/features/comment/commentSlice.js';
import { AvatarUsernameLink } from './AvatarUsernameLink.jsx';

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

    return (
        <div className='comment'>
            <div className="comment__item">
                <div className="comment__item-info">
                    <AvatarUsernameLink about={cmt}/>
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