import React, { useEffect } from 'react';
import MaterialTable from '@material-table/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, deletePost } from '../redux/postsDucks';
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

const Home = () => {

    const dispatch = useDispatch();
    const posts = useSelector(store => store.posts.data);    

    const history = useHistory();    

    const columns = [
        {
            title: 'ID',
            field: 'id',
            cellStyle: { textAlign: 'center', width: '20%' }, 
            headerStyle: { textAlign: 'center' }  
        },
        { 
            title: 'Title',               
            field: 'title',
            cellStyle: { textAlign: 'left', width: '80%' }, 
            headerStyle: { textAlign: 'left' }  
        }
    ];    

    useEffect(() => {              
        dispatch(getPosts());                 
    })
    
    return(
        <div className="col-md-10 mt-5">            
            <MaterialTable                                
                columns={columns}
                data={posts}                                
                title="POSTS" 
                editable={{                                            
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve();
                                dispatch(deletePost(oldData.id));                                
                                dispatch(getPosts());
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Post deleted'
                                })
                            }, 1000)
                        })
                }}
                actions={[
                    {
                        icon: 'visibility',
                        tooltip: 'View Post',
                        onClick: (event, rowData) => {  
                            history.push('/posts/' + rowData.id)
                        }
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit Post',
                        onClick: (event, rowData) => {
                            history.push('/posts/edit/' + rowData.id)
                        }
                    }
                ]}
                options={{
                    headerStyle: {
                        backgroundColor: '#fed136',
                        color: '#000',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    },
                    cellStyle: {
                        textAlign: 'center'
                    },
                    actionsColumnIndex: -1
                }}                              
                 
            />        
        </div>
    )
}

export default Home;