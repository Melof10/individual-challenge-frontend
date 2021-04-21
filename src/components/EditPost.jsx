import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { view_post, edit_post } from '../utils/constants';
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

function EditPost(){

    const { id } = useParams();

    const [post, setPost] = useState({
        id: null,
        title: null, 
        body: null
    })

    const { register, errors, handleSubmit } = useForm();

    const getPost = async(id) => {
        await fetch(view_post + id)
        .then(response => response.json())
        .then(json => {
            setPost({
                id: json.id,
                title: json.title,
                body: json.body
            })
        });
    }

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    }  

    const onSubmit = async(data, e) => {
        e.preventDefault();
        e.target.reset()
        if(data){
            await fetch(edit_post + post.id)
            .then(response => response.json())
            .then(json => {
                Toast.fire({
                    icon: 'success',
                    title: 'Post edited'
                })
                console.log(json)
            })
        }
    }
    
    useEffect(() => {
        getPost(id);
    }, [id])

    return(
        <Fragment>
            <div className="card col-md-8 mt-5">            
                <div className="card-body">
                    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="font-weight-bold mb-3 text-center">Edit Post</h3>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text" 
                                name="title"
                                defaultValue={post.title}
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
                                defaultValue={post.body}
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

export default EditPost;