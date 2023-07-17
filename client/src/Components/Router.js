import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from '../Views/Login.js';
import Register from '../Views/Register.js';
import Blog from '../Views/Blog.js';
import Custom from '../Views/Custom.js';
import Index from '../Views/Index.js';
import Search from '../Views/Search.js';
import Navbar from './Navbar.js';

const Body = () => {

    return (

        <Router>
            <Navbar />
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path="/custom/:bill?" element={<Custom />} />
                <Route path='/register' element={<Register />}></Route>
                <Route path='/search' element={<Search />}></Route>
                <Route path="/" element={<Index />} />
                <Route path="/:login/:bill?" element={<Blog />} />
            </Routes>
        </Router>
    )
}

export default Body