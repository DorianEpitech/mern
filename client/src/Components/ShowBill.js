import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";
import Loader from "./Loader";
import DeleteComment from "./DeleteComment";

export default function ShowBill({ id, view, user }) {

    const [bill, setBill] = useState(null)
   
    let filteredBill = []

    const currentUser = User();

    useEffect(() => {

        getComments()

    }, [view, currentUser, id, user])

    const getComments = async () => {

        if (view === "custom" && currentUser) {
      
            filteredBill = currentUser.blog.billets.find((b) => b.id === id);

            setBill(filteredBill)

        } else if (view === 'blog') {

            await axios
            .post(`http://localhost:6969/bill/${id}`, {user: user})
            .then((response) => {

                filteredBill = response.data.blog.billets.find((b) => b.id === id);

                setBill(filteredBill)
            })
        }
    }

    const updateComments = (id) => {

        const updatedComments = bill.comments.filter(comment => comment.id !== id);
        const updatedBill = { ...bill, comments: updatedComments };
        setBill(updatedBill);
    }

    if (!bill) {

        return <Loader />
    }

    return (

        <div>
            {view === "custom" && bill ? (
                <div className="container mt-4">
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{bill.title}</h5>
                        <p className="card-text">{bill.content}</p>
                        <p className="card-text small font-italic">categories: {bill.category}</p>
                    </div>
                </div>
                    <h2 className="text-center">Comments</h2>
                    {bill.comments.length > 0 ? (
                        bill.comments.map(comment => (
                            <div key={comment.id} className="card mb-3">
                                <div className="card-body">
                                    <a href={`/${comment.author}`} className="card-text small font-italic">from {comment.author}</a>
                                    <p className="card-text">{comment.comment}</p>
                                    <DeleteComment id={comment.id} updateComments={updateComments} />
                                </div>
                            </div>
                        )) 
                    ) : (
                            <div className="row justify-content-center mt-4">
                                <div className="col-md-6">
                                    <div className="alert alert-warning text-center" role="alert">This bill do not have any comments for now !</div>
                                </div>
                            </div>
                        )}
                 </div>
            ) : (bill && (
                    <div className="container mt-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{bill.title}</h5>
                                <p className="card-text">{bill.content}</p>
                                <p className="card-text small font-italic">categories: {bill.category}</p>
                            </div>
                        </div>
                        <h2 className="text-center">Comments</h2>
                        {bill.comments.length > 0 ? (
                            bill.comments.map(comment => (
                                <div key={comment.id} className="card mb-3">
                                    <div className="card-body">
                                        <a href={`/${comment.author}`} className="card-text small font-italic">from {comment.author}</a>
                                        <p className="card-text">{comment.comment}</p>
                                    </div>
                                </div>
                            )) 
                        ) : (
                                <div className="row justify-content-center mt-4">
                                    <div className="col-md-6">
                                        <div className="alert alert-warning text-center" role="alert">This bill do not have any comments for now !</div>
                                </div>
                        </div>
                            )}
                    </div>
                )
            )}
        </div>

    )
}

                            
                        
                        
