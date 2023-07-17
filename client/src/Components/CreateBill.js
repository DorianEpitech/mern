import React, { useState } from 'react';
import axios from 'axios';

export default function CreateBill({ user, updateBills }) {

    let [title, setTitle] = useState(null)
    let [content, setContent] = useState(null)
    let [category, setCategory] = useState(null)
    let [showPopup, setShowPopup] = useState(null)

    const handleSubmitBill = async () => {

       await axios
       .post('http://localhost:6969/new',{ title, content, author: user, category }, { withCredentials: true })
       .then((response) => {

            setShowPopup(null)
            updateBills()
       })
       .catch((err) => {
            console.log(err);
       })
    }

    const handlePopUp = () => {

        setShowPopup(true)
    }

    const handlePopupClose = () => {

        setShowPopup(null)
        setContent(null)
        setTitle(null)
    }

    return (

        <div>
            {showPopup ? (
                <div className="popup">
                    <div className="popup-content mt-2">
                       <input
                        type='text'
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter your title"
                        className='form-control'
                        />    
                    </div>
                    <div className="popup-content mt-2">
                       <input
                        type='text'
                        onChange={e => setCategory(e.target.value)}
                        placeholder="Enter one or more category"
                        className='form-control'
                        />    
                    </div>
                    <div className="popup-content mt-2">
                        <textarea
                        onChange={e => setContent(e.target.value)}
                        placeholder="Enter your content"
                        className='form-control'
                        ></textarea>
                    </div>
                    <div className="popup-buttons mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleSubmitBill}>
                            Submit
                        </button>
                        <button type="button" className="btn btn-secondary ml-2" onClick={handlePopupClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className='row justify-content-center'>
                    <button type='button' className='btn btn-primary' onClick={handlePopUp}>New bill</button>
                </div>
            )}
        </div>
    )
}