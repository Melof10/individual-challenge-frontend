import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function Navbar(){
    return(
        <nav className="main-header navbar navbar-expand navbar-dark bg-dark">                        
            <ul className="navbar-nav ml-auto">                                              
                <li className="nav-item">
                    <Link className="nav-link mr-2 active" to="/">Home</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link btn btn-success active" to="/new">
                        <i className="fas fa-plus mr-1" />
                        New Post
                    </Link>
                </li>      
            </ul>        
        </nav>
    )
}

export default Navbar;