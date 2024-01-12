import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarUsernameLink } from './AvatarUsernameLink.jsx';
import TextareaAutosize from 'react-textarea-autosize';
import Moment from 'react-moment';
import { Change } from './Change.jsx';
import { updateReply } from '../redux/features/reply/replySlice.js';
import { Ok } from './Ok.jsx';
import { Cancel } from './Cancel.jsx';
import { toast } from 'react-toastify';
import { Delete } from './Delete.jsx';

export const ReplyItem = ({ reply }) => {
    const { user } = useSelector((state) => state.auth);
    const [ editReply, setEditReply ] = useState(false);
    const [ replyText, setReplyText ] = useState(reply.reply);

    const dispatch = useDispatch();

    const openFormToEditReply = () => setEditReply(true);
    const closeFormToEditReply = () => {
        setReplyText(reply.reply);
        setEditReply(false);
    }

    const submitEditReplyHandler = async () => {
        try {
            const id = reply._id;
            if(replyText === '')  return toast('Ваша відповідь не може бути порожньою');
            dispatch(updateReply({ id, replyText }));
            setEditReply(false);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='comment'>
            <div className="comment__item">
                <div className="comment__item-info">
                    <AvatarUsernameLink about={reply}/>
                    <div className="comment__item-info--date">
                        <Moment date={reply.createdAt} format='DD.MM.YY HH:mm'/>
                    </div>
                </div>
                <div className="comment__item-text">
                    {editReply ? (
                        <form
                            onSubmit={e => e.preventDefault()}
                        >
                           <TextareaAutosize
                                spellCheck={false}
                                className='comment-edit__textarea'
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                            />
                        </form>
                    ) : (<TextareaAutosize disabled spellCheck={false} value={reply.reply} />)}
                </div>
            </div>
            {user?._id === reply.author &&(
                <div className="comment-action__wrapper">
                    {editReply ? (
                        <div>
                            <Ok onClickFunc={submitEditReplyHandler}/>
                            <Cancel onClickFunc={closeFormToEditReply}/>
                        </div>
                        ) : (
                        <div>
                            <Change onClickFunc={openFormToEditReply}/>
                            <Delete/>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
