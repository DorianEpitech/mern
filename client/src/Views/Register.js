import React, { useState } from 'react';
import axios from "axios";
import User from '../Components/User';

export default function Register() {

    const [login, setLogin] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    if(User()) {

        window.location.href = "http://localhost:4242/";
    }

    async function sendData() {

        const data = {

            login: login,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        await axios
        .post("http://localhost:6969/register", data)
        .then((response) => {
            setSuccessMessage(response.data);
            setTimeout(() => {
                setSuccessMessage(null);
                window.location.href = "http://localhost:4242/login";
            }, 2000);
        })
        .catch((err) => {
            setErrorMessage(err.response.data);
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000);
        })
    }

    return (

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="registerForm">
                        <form>
                        <div className="form-group">
                            <label htmlFor="login">Login:</label>
                            <input
                            className="form-control"
                            id="login"
                            type="text"
                            onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                            className="form-control"
                            id="email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                            className="form-control"
                            id="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                            className="form-control"
                            id="confirmPassword"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-secondary" type="button" onClick={sendData}>
                            Register
                        </button>
                        </form>
                    </div>
                </div>
            </div>
            {errorMessage && (
                <div className="row justify-content-center mt-4">
                    <div className="col-md-6">
                        <div className="alert alert-danger" role="alert">{errorMessage}</div>
                    </div>
                </div>
            )}
            {successMessage && (
                <div className="row justify-content-center mt-4">
                    <div className="col-md-6">
                        <div className="alert alert-success" role="alert">{successMessage}</div>
                    </div>
                </div>
            )}
        </div>
    );
}