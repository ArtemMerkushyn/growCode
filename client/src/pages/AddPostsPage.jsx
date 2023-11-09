import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { createPost } from '../redux/features/post/postSlice.js';

export const AddPostsPage = () => {
    const [ imgUrl, setImgUrl] = useState('');
    const [ title, setTitle] = useState('');
    const [ text, setText] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = () => {
        try {
            dispatch(createPost({ imgUrl, title, text }));
            navigate('/me');
        } catch (error) {
            console.log(error);
        }
    }

    const clearFormHandler = () => {
        setImgUrl('');
        setTitle('');
        setText('');
    }

    return (
        <form className='add-post' onSubmit={(e) => e.preventDefault()}>
            <h3 className="title1">Створити публікацію</h3>
            <label className='add-post__item'>
                <div className='title-post'>Встав url-картинки</div>
                <input 
                    type="text" 
                    placeholder='url-картинки'
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                />
            </label>
            <div className='add-post__item'>
                {imgUrl && (
                    <img className='add-post__item-img' src={imgUrl} alt="img" />
                )}
            </div>
            <label className='add-post__item'>
                <div className='title-post'>Напиши заголовок посту</div>
                <input
                    className='title-post'
                    type="text" 
                    placeholder='Заголовок'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label className='add-post__item'>
                <div className='title-post'>Придумай текст до свого посту</div>
                <TextareaAutosize
                    placeholder='Текст посту'
                    spellCheck={false}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </label>
            <div className='btns-wrapper'>
                <button
                    className='btn1'
                    onClick={submitHandler}
                >
                    Добавити
                </button>

                <button
                    className='btn1 red'
                    onClick={clearFormHandler}
                >
                    Відмінити
                </button>
            </div>
        </form>
    );
}
