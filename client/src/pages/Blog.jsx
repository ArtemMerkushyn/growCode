import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/features/post/postSlice.js';
import { PostItem } from '../components/PostItem.jsx';
import { getAllComments } from '../redux/features/comment/commentSlice.js';
import { CommentItemLink } from '../components/CommentItemLink.jsx';

export const Blog = () => {
    const { posts, popularPosts } = useSelector((state) => state.post);
    const [sortBy, setSortBy] = useState('date');
    const { allComments } = useSelector((state) => state.comment);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllComments());
    }, [dispatch]);

    const sortedPosts = sortBy === 'popular' ? popularPosts : posts;

    const handleChangeSort = (e) => {
        setSortBy(e.target.value);
    };

    if (!sortedPosts.length) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        );
    }
    return (
        <div className='blog-page'>
            <div className="blog-page__container">
                <div className="blog-page__sort">
                    <label htmlFor="sortBy"></label>
                    <select id="sortBy" value={sortBy} onChange={handleChangeSort}>
                        <option value="date">Найновіші</option>
                        <option value="popular">Найпопулярніші</option>
                    </select>
                </div>
                <div className="blog-page__posts">
                {sortedPosts.map((post, idx) => (
                    <PostItem key={idx} post={post} />
                ))}
                </div>
            </div>
            <div className="blog-page__comments">
                <h3 className='title1'>Коментарі</h3>
                {allComments.map((comment, idx) => (
                    <CommentItemLink key={idx} cmt={comment}/>
                ))}
            </div>
        </div>
    );
}
