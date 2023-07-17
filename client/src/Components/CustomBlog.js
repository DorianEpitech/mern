import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import CreateBill from './CreateBill';
import DeleteBill from './DeleteBill';
import EditBill from './EditBill';

export default function CustomBlog({ user }) {

    const [bills, setBills] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)
    const [editingBill, setEditingBill] = useState(null);

    useEffect(() => {

        getBills();
    }, [])  
    
    const getBills = async () => {

        await axios
        .get(`http://localhost:6969/bills/${user}`, { withCredentials: true })
        .then(response => {
            setBills(response.data);
        })
        .catch(error => {
            
            setErrorMessage(error.response.data.message)
        });
    };

    const updateBills = async () => {

        if (editingBill) {

            setEditingBill(null)
        }
        
        await getBills();
    };
    

    if (!bills && !errorMessage) {

        return  <Loader />
        
    } else if (bills){

        if (bills.length === 0) return <div>
                                            <div className="row justify-content-center mt-4">
                                                <div className="col-md-6">
                                                    <div className="alert alert-warning" role="alert">You still havn't posted any Bill, start now !</div>
                                                </div>
                                            </div>
                                            <div className="justify-content-center w-75 mt-4 m-auto">
                                                <CreateBill user={user} updateBills={updateBills} />
                                            </div>
                                        </div>
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
                    <h1 className='text-center mb-3'>Custom my Blog</h1>
                    <div className="justify-content-center w-75 m-auto">
                        <CreateBill user={user} updateBills={updateBills} />
                    </div>
                    <div className="mt-4">
                        {bills.map((bill) => (
                        <div key={bill.id} className="card mb-3">
                            <div className="card-body">
                            {editingBill === bill.id ? ( 
                                <div>
                                    <div className='form-group'>
                                        <input
                                            className='form-control'
                                            type="text"
                                            value={bill.title}
                                            onChange={(e) => {

                                                const updatedBill = { ...bill, title: e.target.value };
                                                const updatedBills = bills.map((b) =>

                                                    b.id === bill.id ? updatedBill : b
                                                );

                                                setBills(updatedBills);
                                            }}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <input
                                            className='form-control'
                                            type="text"
                                            value={bill.category}
                                            onChange={(e) => {

                                                const updatedBill = { ...bill, category: e.target.value };
                                                const updatedBills = bills.map((b) =>

                                                    b.id === bill.id ? updatedBill : b
                                                );

                                                setBills(updatedBills);
                                            }}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <textarea
                                            className='form-control'
                                            value={bill.content}
                                            onChange={(e) => {

                                                const updatedBill = { ...bill, content: e.target.value };
                                                const updatedBills = bills.map((b) =>
                                                    b.id === bill.id ? updatedBill : b
                                                );

                                                setBills(updatedBills);
                                            }}
                                        />
                                    </div>
                                    <button className='btn btn-secondary ml-2' type='button' onClick={() => setEditingBill(null)}>Cancel</button>
                                    <EditBill
                                        id={bill.id}
                                        title={bill.title}
                                        content={bill.content}
                                        category={bill.category}
                                        updateBills={updateBills}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <h5 className="card-title">{bill.title}</h5>
                                    <p className="card-text">{bill.content}</p>
                                    <p className="card-text small font-italic">categories: {bill.category}</p>
                                    <DeleteBill id={bill.id} updateBills={updateBills} />
                                    <button className='btn btn-secondary ml-2' type='button' onClick={() => setEditingBill(bill.id)}>Edit</button>
                                    <a href={`http://localhost:4242/custom/${bill.id}`}><button className='btn btn-success ml-2' type='button'>Show</button></a>
                                </div>
                            )}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}