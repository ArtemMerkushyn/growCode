import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { AiFillChrome } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import { LiaNode } from "react-icons/lia";
import { BsIncognito } from "react-icons/bs";

export const QueryItem = ({ query }) => {
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
        <div className='query'>
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
                        <Link className='link' to={query && query.author ? `/user/${query.author}` : '#'}>
                            {query ? (<div>{query.username}</div>):(<div>загрузка</div>)}
                        </Link>
                    </div>
                </div>
                <div className="query-item__topic tag">{query.topic}</div>
                <div className="post-item__date">
                    {query && query.createdAt ? (
                        <Moment date={query.createdAt} format='DD.MM.YY HH:mm'/>
                    ): (<div>DD.MM.YY HH:mm</div>)

                    }
                </div>
            </div>
            <div className="query-item">
                {query && query.question ? (
                    <h4 className='title-post'>{query.question}</h4>
                    ) : (<h4 className='title-post'>Питання</h4>)
                }
            </div>
            {query && query.text ? (
                <div className="query-item">
                    <TextareaAutosize
                        disabled 
                        spellCheck={false}
                        value={query.text}
                    />
                </div>
            ) : (<div></div>)}
        </div>
    );
}
