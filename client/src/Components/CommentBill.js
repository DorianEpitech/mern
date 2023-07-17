import React, { useState } from 'react';
import axios from 'axios';
import User from './User';

export default function CommentBill({ billId, user }) {

    const [showPopup, setShowPopup] = useState(false);
    const [comment, setComment] = useState('');
    const [successMessage, setSuccessMessage] = useState(null)
    const currentUser = User();

    if (!currentUser) {

        return
    } else if (currentUser.login === user) {

        return
    }
   
    const handleCommentClick = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setComment('');
    };

    const handleSubmitComment = () => {
    
        axios
        .post(`http://localhost:6969/bills/${billId}/comments`, { comment, author: currentUser.login }, { withCredentials: true })
        .then(response => {
            setComment('');
            setShowPopup(false);
            setSuccessMessage(response.data.message)
            setTimeout(() => {
                setSuccessMessage(null);
            }, 2000);
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (

        <div>
            <button type="button" className="btn btn-primary ml-2 mt-2" onClick={handleCommentClick}>
                Comment
            </button>
            {successMessage && (
                <div className="row justify-content-center mt-4">
                    <div className="col-md-6">
                        <div className="alert alert-success" role="alert">{successMessage}</div>
                    </div>
                </div>
            )}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content mt-2">
                        <h3>Add a Comment</h3>
                        <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Enter your comment"
                        ></textarea>
                        <div className="popup-buttons">
                            <button type="button" className="btn btn-primary" onClick={handleSubmitComment}>
                                Submit
                            </button>
                            <button type="button" className="btn btn-secondary ml-2" onClick={handlePopupClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
  );
}
