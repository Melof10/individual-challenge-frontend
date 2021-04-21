import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import { posts, delete_post } from '../utils/constants';
import { useHistory } from 'react-router-dom';
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

function Home(){

    const history = useHistory();
    const [data, setData] = useState([]);

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

    const getPosts = async() => {
        await fetch(posts)
        .then(response => response.json())
        .then(json => setData(json));        
    }

    const deletePost = async(id) => {
        await fetch(delete_post + id)
        .then(response => response.json())
        .then(json => {
            console.log(json)               
            getPosts();
            Toast.fire({
                icon: 'success',
                title: 'Post deleted'
            })
        });        
    }

    useEffect(() => {              
        getPosts();
    }, [])
    

    return(
        <div className="col-md-10 mt-5">
            <MaterialTable                                
                columns={columns}
                data={data}                                
                title="POSTS" 
                editable={{                                            
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                deletePost(oldData.id);
                                resolve();
                            }, 1000)
                        })
                }}
                actions={[
                    {
                        icon: 'visibility',
                        tooltip: 'View User',
                        onClick: (event, rowData) => {  
                            history.push('/posts/' + rowData.id)
                        }
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
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