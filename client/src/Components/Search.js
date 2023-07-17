import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Search({ }) {

    const [value, setValue] = useState(null)
    const navigate = useNavigate()

    const handleSearchSubmit = async () => {

        if (!value) {

            return
        } 

        await axios
        .post('http://localhost:6969/search', { value: value }, { withCredentials: true })
        .then((response) => {
            
            navigate('/search', {state: response.data})
        })
        .catch((err) => {

            console.log(err);
        })

    }

    return (

        <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setValue(e.target.value)}/>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleSearchSubmit} type="button">Search</button>
        </form>
    )
}