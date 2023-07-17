import React from "react";
import axios from "axios";

export default function DeleteComment({ id, updateComments }) {

    const handleSubmitDelete = async () => {

        await axios
        .delete(`http://localhost:6969/comment/${id}`, { withCredentials: true })
        .then((response) => {
        
            updateComments(id)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (

        <button className='btn btn-danger' type='button' onClick={handleSubmitDelete}>Delete</button>
    )
}