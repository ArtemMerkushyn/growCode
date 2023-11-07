import React from 'react';
import { useSelector } from 'react-redux';

export const UserPage = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <div>
            {user ? (
                <div>{user.username}</div>
            ) : (<div>Загрузка</div>)}
        </div>
    );
}
