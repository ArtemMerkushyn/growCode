import React from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import Moment from 'react-moment';
import { AiFillChrome } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import { LiaNode } from "react-icons/lia";
import { BsIncognito } from "react-icons/bs";

export const CommentItemLink = ({ cmt }) => {
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
        <div className='comment hover'>
            <Link className="comment__item all-comments" to={`/${cmt.post}`}>
                <div className="comment__item-info">
                    <div className="comment__item-info--wrapper">
                        <div className="comment__item-info--avatar">
                            {cmt && cmt.profession ? (
                                    getProfessionIcon(cmt.profession)
                                ) : (
                                    <BsIncognito />
                            )}
                        </div>
                        <div className="comment__item-info--username">{cmt.username}</div>
                    </div>
                    <div className="comment__item-info--date">
                        <Moment date={cmt.createdAt} format='DD.MM.YY HH:mm'/>
                    </div>
                </div>
                <div className="comment__item-text">
                    <TextareaAutosize disabled spellCheck={false} value={cmt.comment} />
                </div>
            </Link>
        </div>
    );
}