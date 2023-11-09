import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export const AddPostsPage = () => {
    return (
        <form className='add-post' onSubmit={(e) => e.preventDefault()}>
            <h3 className="title1">Створити публікацію</h3>
            <label className='add-post__item'>
                <div className='title-post'>Встав url-картинки</div>
                <input 
                    type="text" 
                    placeholder='url-картинки'
                />
            </label>
            <div className='add-post__item'>
                <img className='add-post__item-img' src="" alt="img" />
            </div>
            <label className='add-post__item'>
                <div className='title-post'>Напиши заголовок посту</div>
                <input
                    className='title-post'
                    type="text" 
                    placeholder='Заголовок'
                />
            </label>
            <label className='add-post__item'>
                <div className='title-post'>Придумай текст до свого посту</div>
                <TextareaAutosize
                    placeholder='Текст посту'
                    spellCheck={false}
                />
            </label>
            <div className='btns-wrapper'>
                <button
                    className='btn1'
                >
                    Добавити
                </button>

                <button
                    className='btn1 red'
                >
                    Відмінити
                </button>
            </div>
        </form>
    );
}
