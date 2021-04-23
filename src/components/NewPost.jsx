import React, { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/postsDucks';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function NewPost(){

    const dispatch = useDispatch();    

    const [post, setPost] = useState({
        title: null,
        body: null
    })

    const { register, errors, handleSubmit } = useForm();

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async(data, e) => {
        e.preventDefault();
        e.target.reset();
        if(data){
            dispatch(addPost(data));
            Toast.fire({
                icon: 'success',
                title: 'Post created'
            })
        }        
    }

    return(
        <Fragment>
            <div className="card col-md-8 mt-5">            
                <div className="card-body">
                    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="font-weight-bold mb-3 text-center">New Post</h3>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text" 
                                name="title"
                                className={errors?.title?.message ? "form-control is-invalid" : "form-control"}
                                id="title"                                  
                                onChange={handleChange}
                                ref={register({
                                    required: {
                                        value: true, 
                                        message: 'Title is required'
                                    },
                                    minLength: {
                                        value: 6, 
                                        message: 'Min 6 characters'
                                    }
                                })}
                            />     
                            <div className={errors?.title?.message ? "invalid-feedback" : "d-none"}>
                                {errors?.title?.message}
                            </div>                  
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Body</label>
                            <textarea 
                                type="text"
                                name="body" 
                                className={errors?.body?.message ? "form-control is-invalid" : "form-control"}
                                id="body" 
                                onChange={handleChange}
                                ref={register({
                                    required: {
                                        value: true, 
                                        message: 'Body is required'
                                    },
                                    minLength: {
                                        value: 10, 
                                        message: 'Mín 10 characters'
                                    }
                                })}
                            />
                            <div className={errors?.body?.message ? "invalid-feedback" : "d-none"}>
                                {errors?.body?.message}
                            </div>                  
                        </div>                        
                        <button type="submit" className="btn btn-primary col-12 mb-3">
                            <i className="fas fa-cloud-upload-alt mr-1" />
                            Save
                        </button>
                    </form>
                </div>
            </div>            
        </Fragment>
    )
}

export default NewPost;