import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { view_post } from '../utils/constants';

function ViewPost(){
    const { id } = useParams();

    const [data, setData] = useState([]);

    const viewPost = async(id) => {
        await fetch(view_post + id)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            setData(json);
        })
    }

    useEffect(() => {
        viewPost(id);
    }, [id])

    return(
        <Fragment>                 
            <div className="card col-md-8 mt-5">            
                <div className="card-body">
                    <div className="col-12">
                        <div className="d-flex justify-content-between mb-5">
                            <h6 className="font-weight-bold">ID: {data.id}</h6>
                            <h6 className="font-weight-bold">USER ID: {data.userId}</h6>
                        </div>
                        <h5 className="text-center font-weight-bold mb-5">{data.title}</h5>
                        <p className="h5 mb-3">{data.body}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ViewPost;