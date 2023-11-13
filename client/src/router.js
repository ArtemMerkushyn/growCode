import { createBrowserRouter } from 'react-router-dom';
import App from './App.js';
import { MainPage } from './pages/MainPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { Blog } from './pages/Blog.jsx';
import { Forum } from './pages/Forum.jsx';
import { Vacancies } from './pages/Vacancies.jsx';
import { Projects } from './pages/Projects.jsx';
import { MyPage } from './pages/MyPage.jsx';
import { UserPageEdit } from './pages/UserPageEdit.jsx';
import { AddPostsPage } from './pages/AddPostsPage.jsx';
import { PostPage } from './pages/PostPage.jsx';
import { PostPageEdit } from './pages/PostPageEdit.jsx';
import { UserPage } from './pages/UserPage.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <MainPage/>
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'register',
                element: <RegisterPage/>
            },
            {
                path: 'me',
                element: <MyPage/>
            },
            {
                path: 'user/:id',
                element: <UserPage/>
            },
            {
                path: ':id/edit/user',
                element: <UserPageEdit/>
            },
            {
                path: 'blog',
                element: <Blog/>
            },
            {
                path: 'add/posts',
                element: <AddPostsPage/>
            },
            {
                path: ':id',
                element: <PostPage/>
            },
            {
                path: ':id/edit',
                element: <PostPageEdit/>
            },
            {
                path: 'forum',
                element: <Forum/>
            },
            {
                path: 'vacancies',
                element: <Vacancies/>
            },
            {
                path: 'projects',
                element: <Projects/>
            }
        ],
    }
]);