import React from "react";
import { useLocation } from "react-router-dom";


export default function Search() {
    
    const location = useLocation()
    const bills = location.state

    if (!bills) {

        window.location.href = "http://localhost:4242/";
    }

    if (bills.length === 0) {

        return  <div className="row justify-content-center mt-4">
                    <div className="col-md-6">
                        <div className="alert alert-warning" role="alert">Nothing was found with that Search !</div>
                    </div>
                </div>
    }

    return (
        
        <div className="container mt-4">
            {bills.map(bill => (
                <div key={bill.bills.id} className="card mb-3">
                    <div className="card-body">
                        <a href={`/${bill.bills.author}`} className="card-text small font-italic">from {bill.bills.author}</a>
                        <h5 className="card-title">{bill.bills.title}</h5>
                        <p className="card-text">{bill.bills.content}</p>
                        <p className="card-text small font-italic">categories: {bill.bills.category}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}