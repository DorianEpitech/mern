import axios from 'axios';

export default function LogOut() {

    axios
    .get('http://localhost:6969/logout', {withCredentials: true})
    .then(() => {

        window.location.href = "http://localhost:4242/";
    })
}