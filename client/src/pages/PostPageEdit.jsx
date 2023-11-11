import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios.js';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import { updatePost } from '../redux/features/post/postSlice.js';

export const PostPageEdit = () => {
    const [imgUrl, setImgUrl] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
        setTitle(data.title);
        setText(data.text);
        setImgUrl(data.imgUrl);
    }, [params.id]);

    const submitHandler = async () => {
        try {
            const updatedData  = { id: params.id, imgUrl, title, text };
            await dispatch(updatePost({ id: params.id, updatedPost: updatedData }));
            navigate(`/${params.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const clearFormHandler = () => {
        setImgUrl('');
        setTitle('');
        setText('');
    }

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    return (
        <form className='add-post' onSubmit={(e) => e.preventDefault()}>
            <h3 className="title1">Редагувати публікацію</h3>
            <label className='add-post__item'>
                <div className='title-post'>Встав новий url-картинки</div>
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
                <div className='title-post'>Зміни заголовок посту</div>
                <input
                    className='title-post'
                    type="text" 
                    placeholder='Заголовок'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label className='add-post__item'>
                <div className='title-post'>Редагуй текст до свого посту</div>
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
                    Оновити
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
