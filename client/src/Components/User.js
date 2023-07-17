import { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        axios
        .get('http://localhost:6969/user', { withCredentials: true })
        .then(response => {
            setCurrentUser(response.data[0]);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return currentUser;
};

export default User;
