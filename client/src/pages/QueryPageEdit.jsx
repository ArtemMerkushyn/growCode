import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios.js';
import TextareaAutosize from 'react-textarea-autosize';
import { updateQuery } from '../redux/features/query/querySlice';

export const QueryPageEdit = () => {
    const [ question, setQuestion ] = useState('');
    const [ text, setText ] = useState('');
    const [ topic, setTopic ] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const fetchQuery = useCallback( async () => {
        const { data } = await axios.get(`/queries/${params.id}`);
        setQuestion(data.question);
        setText(data.text);
        setTopic(data.topic);
    }, [params.id] );

    const submitFormHandler = async () => {
        try {
            const updatedData = { id: params.id, question, text, topic }
            await dispatch(updateQuery({ id: params.id, updatedQuery: updatedData }));
            navigate(`/query/${params.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const clearFormHandler = () => {
        setQuestion('');
        setText('');
        setTopic('');
    }

    useEffect(() => {
        fetchQuery();
    }, [fetchQuery]);

    return (
        <form className='form-add' onSubmit={e => e.preventDefault()}>
            <h5 className='title1'>Онови своє питання</h5>
            <label className="form-add__item select">
                <h6 className='title-small'>Зміни тему питання</h6>
                <select value={topic} onChange={e => setTopic(e.target.value)}>
                    <option value="інше">інше</option>
                    <option value="HTML/CSS">HTML/CSS</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                </select>
            </label>
            <label className="form-add__item">
                <h6 className='title-small tac'>Зміни твоє питання</h6>
                <input
                    className='title-small'
                    type="text"
                    placeholder='Твоє питання'
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                />
            </label>
            <label className="form-add__item">
                <h6 className='title-small'>Зміни опис твого питання</h6>
                <TextareaAutosize
                    placeholder='Опис твого питання'
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </label>
            <div className='btns-wrapper'>
                <button
                    className='btn1'
                    onClick={submitFormHandler}
                >
                    Оновити
                </button>

                <button
                    className='btn1 red'
                    onClick={clearFormHandler}
                >
                    Очистити
                </button>
            </div>
        </form>
    );
}
