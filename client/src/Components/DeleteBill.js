import React from 'react'
import axios from 'axios'

export default function DeleteBill({ id, updateBills }) {

    const handleSubmitDelete = async () => {

        await axios
        .delete(`http://localhost:6969/bill/${id}`, { withCredentials: true })
        .then((response) => {
            updateBills()
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        
        <button className='btn btn-danger' type='button' onClick={handleSubmitDelete}>Delete</button>
    )
}