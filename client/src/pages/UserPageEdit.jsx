import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { BsIncognito } from "react-icons/bs";
import { AiFillChrome } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import { LiaNode } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios.js';
import { updateUser } from '../redux/features/auth/authSlice.js';

export const UserPageEdit = () => {
    const [ profession, setProfession ] = useState('');
    const [ level, setLevel ] = useState('');
    const [ description, setDescription ] = useState('');
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const fetchUserData = async () => {
        const { data } = await axios.get(`/auth/me`);
        setProfession(data.user.profession);
        setLevel(data.user.level);
        setDescription(data.user.description);
    }

    useEffect(() => {
        fetchUserData();
    }, []);
    
    const submitHandler = async () => {
        try {
            const updatedData = { id: params.id, profession, level, description }
            dispatch(updateUser({ id: params.id, updatedUser: updatedData }));
            navigate('/me')
        } catch (error) {
            console.log(error);
        }
    }

    const clearFormHandler = (e) => {
        setProfession('');
        setLevel('');
        setDescription('');
        e.preventDefault();
    }

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
    }

    return (
        <div className='userpage-edit'>
            <div className='userpage__info-avatar'>
                {getProfessionIcon(profession)}
            </div>
            <div className="userpage-edit__items">
                <div className="userpage__info-username">
                    {user ? user.username : (<div>username</div>)}
                </div>
                <form className='useredit-form'>
                    <label className='useredit-form__item'>
                        Вибери свою професію
                        <select onChange={(e) => setProfession(e.target.value)} value={profession}>
                            <option value="">вибрати</option>
                            <option value="front-end developer">front-end developer</option>
                            <option value="backend developer">backend developer</option>
                            <option value="full-stack developer">full-stack developer</option>
                        </select>
                    </label>
                    <label className='useredit-form__item'>
                        Вибери свій рівень компетенції як розробника
                        <select onChange={(e) => setLevel(e.target.value)} value={level}>
                            <option value="">вибрати</option>
                            <option value="junior">junior</option>
                            <option value="middle">middle</option>
                            <option value="senior">senior</option>
                        </select>
                    </label>
                    <label className='useredit-form__item text'>
                        Опис сторінки профілю
                        <TextareaAutosize
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
            </div>
        </div>
    );
}