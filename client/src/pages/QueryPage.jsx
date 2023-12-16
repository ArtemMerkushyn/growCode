import axios from '../utils/axios.js';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import TextareaAutosize from 'react-textarea-autosize';
import { CountItem } from '../components/CountItem.jsx';
import { AvatarUsernameLink } from '../components/AvatarUsernameLink.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuery } from '../redux/features/query/querySlice.js';
import { HiPencilAlt } from "react-icons/hi";
import { BsTrash3Fill } from "react-icons/bs";
import { AiOutlineSend } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { createReply } from '../redux/features/reply/replySlice.js';

export const QueryPage = () => {
    const [query, setQuery] = useState(null);
    const [reply, setReply] = useState('');
    const { user } = useSelector((state) => state.auth);

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchQuery = useCallback(async () => {
        const { data } = await axios.get(`/queries/${params.id}`);
        setQuery(data);
    }, [params.id]);

    const handleDeleteQuery = () => {
        dispatch(deleteQuery(params.id));
        navigate('/me');
    }

    const handleSumitReply = () => {
        if(!user) toast('Вам потрібно авторизуватися для того щоб відповісти на питання');
        if(!reply.trim()) toast('Поле для відповіді на питання не може бути порожнім');
        const queryId = params.id;
        dispatch(createReply({ queryId, reply }));
        setReply('');
        toast('Дякуємо за відповідь!');
    }

    useEffect(() => {
        fetchQuery();
    }, [fetchQuery]);

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
                <CountItem about={query} />
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
        </div>
    );
};