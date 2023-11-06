import './App.css';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './redux/features/auth/authSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);
    return (
        <div className="App">
            <NavBar/>
            <div className="container">
                <Outlet/>
                <ToastContainer position='top-right'/>
            </div>
        </div>
    );
}

export default App;