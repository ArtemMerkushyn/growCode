import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { createQuery, getAllQueries } from '../redux/features/query/querySlice.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { QueryItem } from '../components/QueryItem.jsx';

export const Forum = () => {
    const [ isActiveForumForm , setIsActiveForumForm ] = useState(false);
    const [ question, setQuestion ] = useState('');
    const [ text, setText ] = useState('');
    const [ topic, setTopic ] = useState('інше');

    const { queries } = useSelector((state) => state.query);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isActiveForumFormHandler = () => setIsActiveForumForm(true);
    const isNoActiveFormHandler = () => {
        setQuestion('');
        setText('');
        setTopic('');
        setIsActiveForumForm(false);
    }

    const submitHandler = () => {
        if(!question) {
            toast('Поле твоє питання не може бути порожнім');
        }
        dispatch(createQuery({ question, text, topic }));
        isNoActiveFormHandler();
        navigate('/me')
    }

    useEffect(() => {
        dispatch(getAllQueries());
    }, [dispatch]);

    return (
        <div className='forum'>
            <div className="forum__header">
                <h3 className='title1'>Задати питання</h3>
                <button className='forum__add add' onClick={isActiveForumFormHandler}></button>
            </div>
            <div className={`forum-form__wrapper ${isActiveForumForm ? 'active' : ''}`}>
                <form className={`forum-form ${isActiveForumForm ? 'active' : ''}`} onSubmit={e => e.preventDefault()}>
                    <h5 className='title1'>Задай своє питання</h5>
                    <label className='forum-form__item select'>
                        <h6 className='title-small'>Вибери тему питання</h6>
                        <select value={topic} onChange={e => setTopic(e.target.value)}>
                            <option value="інше">інше</option>
                            <option value="HTML/CSS">HTML/CSS</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="React">React</option>
                        </select>
                    </label>
                    <label className='forum-form__item'>
                        <h6 className='title-small tac'>Напиши твоє питання</h6>
                        <input
                            className='forum-form__input title-small'
                            type="text" 
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                        />
                    </label>
                    <label className='forum-form__item text'>
                        <h6 className='title-small'>Опиши більш детальніше твоє питання</h6>
                        <TextareaAutosize
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    </label>
                    <div className='btns-wrapper'>
                        <button
                            className='btn1'
                            onClick={submitHandler}
                        >
                            Запитати
                        </button>

                        <button
                            className='btn1 red'
                            onClick={isNoActiveFormHandler}
                        >
                            Відмінити
                        </button>
                    </div>
                </form>
            </div>

            <div className="forum__container">
                {queries.map((query, idx) => <QueryItem key={idx} query={query}/>)}
            </div>
        </div>
    );
}
