import axios from '../utils/axios.js';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import TextareaAutosize from 'react-textarea-autosize';
import { CountItem } from '../components/CountItem.jsx';
import { AvatarUsernameLink } from '../components/AvatarUsernameLink.jsx';

export const QueryPage = () => {
    const [query, setQuery] = useState(null);

    const params = useParams();

    const fetchQuery = useCallback(async () => {
        const { data } = await axios.get(`/queries/${params.id}`);
        setQuery(data);
    }, [params.id]);

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
            </div>
        </div>
    );
};