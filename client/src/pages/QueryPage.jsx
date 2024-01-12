import axios from '../utils/axios.js';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import TextareaAutosize from 'react-textarea-autosize';
import { AvatarUsernameLink } from '../components/AvatarUsernameLink.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuery } from '../redux/features/query/querySlice.js';
import { HiPencilAlt } from "react-icons/hi";
import { BsTrash3Fill } from "react-icons/bs";
import { AiOutlineSend } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { createReply, getQueryReplies } from '../redux/features/reply/replySlice.js';
import { ReplyItem } from '../components/ReplyItem.jsx';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';

export const QueryPage = () => {
    const [query, setQuery] = useState(null);
    const [reply, setReply] = useState('');
    const { user } = useSelector((state) => state.auth);
    const { replies } = useSelector((state) => state.reply);

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchQuery = useCallback(async () => {
        const { data } = await axios.get(`/queries/${params.id}`);
        setQuery(data);
    }, [params.id]);

    const fetchQueryReplies = useCallback(async () => {
        try {
            dispatch(getQueryReplies(params.id));
        } catch (error) {
            console.log(error)
        }
    }, [dispatch, params.id]);

    const handleDeleteQuery = () => {
        dispatch(deleteQuery(params.id));
        navigate('/forum');
    }

    const handleSumitReply = () => {
        if(!user) return toast('Вам потрібно авторизуватися для того щоб відповісти на питання');
        if(!reply.trim()) return toast('Поле для відповіді на питання не може бути порожнім');
        const queryId = params.id;
        dispatch(createReply({ queryId, reply }));
        setReply('');
        toast('Дякуємо за відповідь!');
    }

    useEffect(() => {
        fetchQuery();
    }, [fetchQuery]);

    useEffect(() => {
        fetchQueryReplies();
    }, [fetchQueryReplies])

    if (!query) {
        return (
            <div>
                Загрузка...
            </div>
        );
    }

    return (
        <div className='query-page'>
            <div className="query-item">
                <AvatarUsernameLink about={query}/>
                <div className="query-item__topic tag">{query.topic}</div>
                <div className="post-item__date">
                    {query && query.createdAt ? (
                        <Moment date={query.createdAt} format='DD.MM.YY HH:mm'/>
                    ): (<div>DD.MM.YY HH:mm</div>)}
                </div>
            </div>
            <div className="query-page__item">
                <h4 className='title-post'>{query.question}</h4>
                <TextareaAutosize
                    className='query-page__item-text'
                    disabled 
                    spellCheck={false}
                    value={query.text}
                />
            </div>
            <div className="query-page__item">
                <div className='count'>
                    <div className='count__item'>
                        <AiFillEye className='fs'/><span>{query.views}</span>
                    </div>
                    <div className='count__item'>
                        <AiOutlineMessage />{' '}
                        <span>{replies?.length || 0} </span>
                    </div>
                </div>
                {user?._id === query.author && (
                    <div className="action-btns">
                        <Link to={`/query/${query._id}/edit`}>
                            <div className='action-btn'><HiPencilAlt/></div>
                        </Link>
                        <button className='action-btn' onClick={handleDeleteQuery}><BsTrash3Fill /></button>
                    </div>
                )}
            </div>
            <form 
                className='post-item__form' 
                onSubmit={(e) => e.preventDefault()}
            >
                <label className='post-item__form-textarea'>
                    <TextareaAutosize
                        placeholder='Відповісти на питання'
                        spellCheck={false}
                        value={reply}
                        onChange={e => setReply(e.target.value)}
                    />
                </label>
                <button 
                    className='post-item__form-btn'
                    onClick={handleSumitReply}
                >
                    <AiOutlineSend />
                </button>
            </form>
            {replies && replies.map(reply => (
                <ReplyItem key={reply._id} reply={reply} />
            ))}
        </div>
    );
};