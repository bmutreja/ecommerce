import axios from 'axios';
import * as actionTypes from '../constant/productConstants';


export const getProducts = ()=> async(dispatch) => {
    try{
        dispatch({
            type: actionTypes.ALL_PRODUCTS_REQUEST
        });

        const {data}  = await axios.get('/api/v1/products');

        dispatch({
            type: actionTypes.ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    }catch(error){ 
        dispatch({
            type: actionTypes.ALL_PRODUCTS_FAIL,
            payload: error.message
        })
    }
}



export const getProductDetails = (id)=> async(dispatch) => {
    try{
        dispatch({
            type: actionTypes.PRODUCT_DETAIL_REQUEST
        });

        const {data}  = await axios.get(`/api/v1/product/${id}`);
          
        dispatch({
            type: actionTypes.PRODUCT_DETAIL_SUCCESS,
            payload: data.product
        })

    }catch(error){ 
        dispatch({
            type: actionTypes.PRODUCT_DETAIL_FAIL,
            payload: error.message
        })
    }
}



// clearerrors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: actionTypes.CLEAR_ERRORS,
        
    })
}