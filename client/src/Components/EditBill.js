import React from "react";
import axios from "axios";

export default function EditBill({ id, title, content, category, updateBills, onEditClick }) {

    const handleEditBill = async () => {

        await axios
        .put(`http://localhost:6969/bill/${id}`, { title, content, category }, { withCredentials: true })
        .then((response) => {

            updateBills()
            onEditClick(null)
        })
        .catch((err) => {

            console.log(err);
        })
    }

    return (

        <button className='btn btn-success ml-2' type='button' onClick={handleEditBill}>Confirm</button>
    )
}