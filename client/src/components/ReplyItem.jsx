import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AvatarUsernameLink } from './AvatarUsernameLink.jsx';
import TextareaAutosize from 'react-textarea-autosize';
import Moment from 'react-moment';

export const ReplyItem = ({ reply }) => {
    const { user } = useSelector((state) => state.auth);
    const [ editReply, setEditComment ] = useState(false);
    const [ replyText, setReplyText ] = useState(reply.reply);

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
                            <button className='link'>Оновити</button>
                            <button className='link'>Відмінити</button>
                        </div>
                        ) : (
                        <div>
                            <button className='link'>Редагувати</button>
                            <button className='link'>Видалити</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
