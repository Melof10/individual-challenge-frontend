import axios from 'axios';
import { 
    get_posts, 
    view_post, 
    add_post, 
    edit_post, 
    delete_post } 
from '../utils/constants';

// constants
const dataInitial = {
    data: []
}

// types
const GET_POSTS = 'GET_POSTS';
const VIEW_POST = 'VIEW_POST';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';

// reducer
export default function postsReducer(state = dataInitial, action){
    switch(action.type){
        case GET_POSTS:
            return { ...state, data: action.payload }            
        
        case VIEW_POST:
            return { ...state, data: action.payload }
        
        case ADD_POST:
            return { ...state, data: action.payload }
        
        case EDIT_POST:
            return { ...state, data: action.payload }
        
        case DELETE_POST:
            return { ...state, data: action.payload }

        default:
            return state
    }
}

// actions
export const getPosts = () => async(dispatch, getState) => {    
    try {
        const response = await axios.get(get_posts)
        console.log(response.data);
        dispatch({
            type: GET_POSTS,
            payload: response.data
        })
    } catch (error) {        
        console.log(error)
    }    
}

export const viewPost = (id) => async(dispatch) => {
    try {
        const response = await axios.get(view_post + id)
        console.log(response.data);
        dispatch({
            type: VIEW_POST,
            payload: response.data
        })
    } catch (error) {        
        console.log(error)
    }
}

export const addPost = (data) => async(dispatch) => {
    await axios.post(add_post, data)
    .then(response => {        
        console.log(response.data);
        dispatch({
            type: ADD_POST,
            payload: response.data
        })
    })
    .catch(error => {
        console.log(error);
    })
}

export const editPost = (data, id) => async(dispatch) => {
    await axios.patch(edit_post + id, data)
    .then(response => {        
        console.log(response.data);        
        dispatch({
            type: EDIT_POST,
            payload: response.data
        })
    })
    .catch(error => {
        console.log(error);
    })
}

export const deletePost = (id) => async(dispatch) => {
    try {
        const response = await axios.delete(delete_post + id)        
        console.log(response);
        dispatch({
            type: DELETE_POST,
            payload: response
        })
    } catch (error) {             
        console.log(error)
    }    
}