import React, { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { viewPost } from '../redux/postsDucks';

function ViewPost(){
    const { id } = useParams();

    const dispatch = useDispatch();
    const post = useSelector(store => store.posts.data);    

    useEffect(() => {
        dispatch(viewPost(id))
    })

    return(
        <Fragment>                 
            <div className="card col-md-8 mt-5">            
                <div className="card-body">
                    <div className="col-12">
                        <div className="d-flex justify-content-between mb-5">
                            <h6 className="font-weight-bold">ID: {post.id}</h6>
                            <h6 className="font-weight-bold">USER ID: {post.userId}</h6>
                        </div>
                        <h5 className="text-center font-weight-bold mb-5">{post.title}</h5>
                        <p className="h5 mb-3">{post.body}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ViewPost;