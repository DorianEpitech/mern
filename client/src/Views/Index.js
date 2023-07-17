import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Index() {

    const [bills, setBills] = useState([])

    useEffect(() => {

        axios
        .get('http://localhost:6969/bills')
        .then((response) => {

            setBills(response.data)
        })
        .catch((err) => {

            console.log(err);
        })
    }, [])

    return (

        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Blogs</h5>
                    <ul className="list-group list-group-flush">
                        {bills.map((login, index) => (
                            <li key={index} className="list-group-item">
                                <a href={`/${login}`}>{login}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}