import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { BsIncognito } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from 'react-redux';

export const UserPageEdit = () => {
    
    return (
        <div className='userpage-edit'>
            <div className='userpage__info-avatar'>
                <BsIncognito/>
            </div>
            <div className="userpage-edit__items">
                <div className="userpage__info-username">
                    username
                </div>
                <form className='useredit-form'>
                    <label className='useredit-form__item'>
                        Вибери свою професію
                        <select>
                            <option value="">вибрати</option>
                            <option value="front-end developer">front-end developer</option>
                            <option value="backend developer">backend developer</option>
                            <option value="full-stack developer">full-stack developer</option>
                        </select>
                    </label>
                    <label className='useredit-form__item'>
                        Вибери свій рівень компетенції як розробника
                        <select>
                            <option value="">вибрати</option>
                            <option value="junior">junior</option>
                            <option value="middle">middle</option>
                            <option value="senior">senior</option>
                        </select>
                    </label>
                    <label className='useredit-form__item text'>
                        Опис сторінки профілю
                        <TextareaAutosize/>
                    </label>
                    <div className='btns-wrapper'>
                        <button
                            className='btn1'
                        >
                            Оновити
                        </button>

                        <button
                            className='btn1 red'
                        >
                            Відмінити
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}