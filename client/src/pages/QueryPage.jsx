import axios from '../utils/axios.js';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { AiFillChrome } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import { LiaNode } from "react-icons/lia";
import { BsIncognito } from "react-icons/bs";
import TextareaAutosize from 'react-textarea-autosize';
import { CountItem } from '../components/CountItem.jsx';

export const QueryPage = () => {
    const [query, setQuery] = useState(null);
    const user = useSelector((state) => state.auth.user);

    const params = useParams();

    const fetchQuery = useCallback(async () => {
        const { data } = await axios.get(`/queries/${params.id}`);
        setQuery(data);
    }, [params.id]);

    useEffect(() => {
        fetchQuery();
    }, [fetchQuery]);

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
                <div className="post-item__info-username">
                    <div className='userpage__info-avatar'>
                        {query && query.profession ? (
                            getProfessionIcon(query.profession)
                        ) : (
                            <BsIncognito />
                        )}
                    </div>
                    <div className='userpage__info-username'>
                        <Link className='link' to={query && query?.author === user?._id ? `/me` : `/user/${query?.author}`}>
                            {query ? (<div>{query.username}</div>):(<div>загрузка</div>)}
                        </Link>
                    </div>
                </div>
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