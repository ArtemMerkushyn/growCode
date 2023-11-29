import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export const Forum = () => {
    const [isActiveForumForm , setIsActiveForumForm ] = useState(false);

    const isActiveForumFormHandler = () => setIsActiveForumForm(true);
    return (
        <div className='forum'>
            <button className='forum__add' onClick={isActiveForumFormHandler}>Задати питання</button>
            <div className={`forum-form__wrapper ${isActiveForumForm ? 'active' : ''}`}>
                <form className={`forum-form ${isActiveForumForm ? 'active' : ''}`} onSubmit={e => e.preventDefault()}>
                    <h5 className='title1'>Задай своє питання</h5>
                    <label className='forum-form__item select'>
                        <h6 className='title-small'>Вибери тему питання</h6>
                        <select>
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
                        />
                    </label>
                    <label className='forum-form__item text'>
                        <h6 className='title-small'>Опиши більш детальніше твоє питання</h6>
                        <TextareaAutosize
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
            </div>
        </div>
    );
}
