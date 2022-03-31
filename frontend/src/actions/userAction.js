import * as actionTypes from '../constant/userConstants';
import axios from 'axios';

export const login = (email,password) => async (dispatch) => {
    try {
        
        dispatch({
            type: actionTypes.LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'content-type' : 'application/json',
            }
        }

        const {data} = await axios.post('/api/v1/login',{email,password}, config);

        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
         dispatch({
             type: actionTypes.LOGIN_FAILD,
             payload: error.message
         })   
    }
}

export const register = (userData) => async (dispatch) => {
    try {
        
        dispatch({
            type: actionTypes.REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'content-type' : 'multipart/form-data',
            }
        }

        const {data} = await axios.post('/api/v1/register',userData, config);

        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
         dispatch({
             type: actionTypes.REGISTER_FAILD,
             payload: error.message
         })   
    }
}


// clearerrors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: actionTypes.CLEAR_ERROR,
        
    })
}