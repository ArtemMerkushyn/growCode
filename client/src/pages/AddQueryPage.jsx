import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { createQuery } from '../redux/features/query/querySlice.js';
import { toast } from 'react-toastify';

export const AddQueryPage = () => {
    const [ question, setQuestion ] = useState('');
    const [ text, setText ] = useState('');
    const [ topic, setTopic ] = useState('інше');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = () => {
        try {
            if(!question) {
                return toast('Поле твоє питання не може бути порожнім');
            }
            dispatch(createQuery({ question, text, topic }));
            navigate('/me');
        } catch (error) {
            console.log(error)
        }
    }

    const removeFormHandler = () => {
        setQuestion('');
        setText('');
        setTopic('');
    }
    return (
        <form className='form-add' onSubmit={e => e.preventDefault()}>
            <h5 className='title1'>Задай своє питання</h5>
            <label className="form-add__item select">
                <h6 className='title-small'>Вибери тему питання</h6>
                <select value={topic} onChange={e => setTopic(e.target.value)}>
                    <option value="інше">інше</option>
                    <option value="HTML/CSS">HTML/CSS</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                </select>
            </label>
            <label className="form-add__item">
                <h6 className='title-small tac'>Напиши твоє питання</h6>
                <input
                    className='title-small'
                    type="text"
                    placeholder='Твоє питання'
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                />
            </label>
            <label className="form-add__item">
                <h6 className='title-small'>Опиши більш детальніше твоє питання</h6>
                <TextareaAutosize
                    placeholder='Опис твого питання'
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
                    onClick={removeFormHandler}
                >
                    Відмінити
                </button>
            </div>
        </form>
    );
}
