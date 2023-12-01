import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQueries } from '../redux/features/query/querySlice.js';
import { Link } from 'react-router-dom';
import { QueryItem } from '../components/QueryItem.jsx';

export const Forum = () => {
    const { queries } = useSelector((state) => state.query);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllQueries());
    }, [dispatch]);

    return (
        <div className='forum'>
            <div className="forum__header">
                <h3 className='title1'>Задати питання</h3>
                <Link to={'/forum/add'}>
                    <button className='forum__add add'></button>
                </Link>
            </div>

            <div className="forum__container">
                {queries && queries.map((query, idx) => <QueryItem key={idx} query={query}/>)}
            </div>
        </div>
    );
}
