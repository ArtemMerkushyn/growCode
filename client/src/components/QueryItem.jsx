import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { CountItem } from './CountItem';
import { AvatarUsernameLink } from './AvatarUsernameLink';

export const QueryItem = ({ query }) => {
    return (
        <div className='query'>
            <div className="query-item">
                <AvatarUsernameLink about={query}/>
                <div className="query-item__topic tag">{query.topic}</div>
                <div className="post-item__date">
                    {query && query.createdAt ? (
                        <Moment date={query.createdAt} format='DD.MM.YY HH:mm'/>
                    ): (<div>DD.MM.YY HH:mm</div>)

                    }
                </div>
            </div>
            <div className="query-item">
                <Link to={`/query/${query._id}`}>
                    {query && query.question ? (
                        <h4 className='title-post'>{query.question}</h4>
                        ) : (<h4 className='title-post'>Питання</h4>)
                    }
                </Link>
            </div>
            <CountItem about={query}/>
        </div>
    );
}
