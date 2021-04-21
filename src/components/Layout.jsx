import React, { Fragment } from 'react';
import Navbar from './Navbar';

function Layout(props){
    return(
        <Fragment>
            <Navbar />
            <div className="container d-flex justify-content-center">  
                {props.children}
            </div>            
        </Fragment>
    )
}

export default Layout;