import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios.js';
import Moment from 'react-moment';
import TextareaAutosize from 'react-textarea-autosize';
import { AiFillEye, AiOutlineMessage, AiOutlineSend } from 'react-icons/ai';
import { AiFillChrome } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import { LiaNode } from "react-icons/lia";
import { BsIncognito } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PostItem } from '../components/PostItem.jsx';
import { createComment, getPostComments } from '../redux/features/comment/commentSlice.js';
import { CommentItem } from '../components/CommentItem.jsx';

export const PostPage = () => {
    const [ post, setPost ] = useState(null);
    const [ popularPosts, setPopularPosts ] = useState([]);
    const [ comment, setComment ] = useState('');
    const { comments } = useSelector((state) => state.comment);
    console.log(comments)
    const { user } = useSelector((state) => state.auth);
    const params = useParams();
    const dispatch = useDispatch();

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
        setPost(data);
    }, [params.id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const fetchComments = useCallback(async () => {
        try {
          dispatch(getPostComments(params.id));
        } catch (error) {
          console.log(error);
        }
    }, [params.id, dispatch]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const fetchPosts = useCallback(async () => {
        const { data } = await axios.get('/posts');
        setPopularPosts(data.popularPosts);
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const hamdleSubmit = () => {
        try {
            if(!user) {
                setComment('');
                return toast('Авторизуйтесь, щоб залишити ваш коментар');
            }
            if(!comment.trim()) {
                return toast('Коментар не може бути пустим');
            }
            const postId = params.id;
            dispatch(createComment({ postId, comment }));
            setComment('');
            toast('Дякуємо за твою думку');
        } catch (error) {
            console.log(error)
        }
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
    };

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        );
    }

    return (
        <div className='post-page'>
            <div className='post-item'>
                <div className="post-item__img">
                    {post.imgUrl ? (
                        <img src={post.imgUrl} alt="img"/>
                    ) : null}
                </div> 
                <div className="post-item__info">
                    <div className="post-item__info-username">
                        <div className='userpage__info-avatar'>
                            {post && post.profession ? (
                                getProfessionIcon(post.profession)
                            ) : (
                                <BsIncognito />
                            )}
                        </div>
                        <div className='userpage__info-username'>
                            {post ? (<Link to={`/user/${post.author}`} className='link'>{post.username}</Link>):(<div>загрузка</div>)}
                        </div>
                    </div>
                    <div className="post-item__date">
                        <Moment date={post.createdAt} format='DD.MM.YY HH:mm'/>
                    </div>
                </div>
                <div className=" post-item__title title-post">{post.title}</div>
                <div className="post-item__text"> 
                    <TextareaAutosize
                        disabled 
                        spellCheck={false}
                        value={post.text}
                    />
                </div>
                <div className="post-item__action">
                    <div className='post-item__counter'>
                        <button className='post-item__counter-btn'>
                            <AiFillEye/><span>{post.views}</span>
                        </button>
                        <button className='post-item__counter-btn'>
                            <AiOutlineMessage />{' '}
                            <span>{post.comments?.length || 0} </span>
                        </button>
                    </div>
                    {user?._id === post.author && (
                        <div className="post-item__action-btns">
                            <Link to={`/${params.id}/edit`}>
                                <div className='link'>Редагувати</div>
                            </Link>
                        </div>
                    )}
                </div>
                <form 
                    className='post-item__form' 
                    onSubmit={(e) => e.preventDefault()}
                >
                    <label className='post-item__form-textarea'>
                        <TextareaAutosize
                            placeholder='Залиште ваш коментар'
                            spellCheck={false}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </label>
                    <button 
                        className='post-item__form-btn'
                        onClick={hamdleSubmit}
                    >
                        <AiOutlineSend />
                    </button>
                </form>
                {comments?.map((cmt) => (
                    <CommentItem key={cmt._id} cmt={cmt} author={cmt.author}/>
                ))}
            </div>
            <div className="popular-posts">
                <h3 className="title1">Популярні пости</h3>
                {popularPosts.map((post, idx) => (
                    <PostItem key={idx} post={post} />
                ))}
            </div>
        </div>
    );
}
