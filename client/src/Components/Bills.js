import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentBill from './CommentBill.js';
import Loader from './Loader.js';

export default function Bills({ user }) {

    const [bills, setBills] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {

        axios.get(`http://localhost:6969/bills/${user}`, { withCredentials: true })
        .then(response => {
            setBills(response.data);
        })
        .catch(error => {
            
            setErrorMessage(error.response.data.message)
        });
    }, [user]);

    if (!bills && !errorMessage) {

        return  <Loader />
        
    } else if (bills){

        if (bills.length === 0) return <div>This user has no Bill yet</div>
    }     

    return (
        
        <div className="container mt-4">
            {errorMessage ? (
                <div className="row justify-content-center mt-4">
                    <div className="col-md-6">
                        <div className="alert alert-danger" role="alert">{errorMessage}</div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>{user}'s Blog</h1>
                    {bills.map(bill => (
                        <div key={bill.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{bill.title}</h5>
                                <p className="card-text">{bill.content}</p>
                                <p className="card-text small font-italic">categories: {bill.category}</p>
                                    <a href={`http://localhost:4242/${user}/${bill.id}`}><button className='ml-2 btn btn-success' type='button'>Show</button></a>
                                    <CommentBill billId={bill.id} user={user} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
