import * as actionTypes from '../constant/productConstants';

export const productsReducers = (state = { products: [] }, action) => {

    switch(action.type){

        case actionTypes.ALL_PRODUCTS_REQUEST:
            return{
                loading: true,
                products: [],
               
            }
          
        case actionTypes.ALL_PRODUCTS_SUCCESS:
            return{
                loading: false,
                products: action.payload.products,
                products_count: action.payload.productCount
            }
            
        case actionTypes.ALL_PRODUCTS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        
        case actionTypes.CLEAR_ERRORS:
            return{
                    ...state,
                    error: null 
                }    

        default: 
            return state;

    }


};



export const productDetailReducer = (state = {product:{}}, action) => {

    switch(action.type){

        case actionTypes.PRODUCT_DETAIL_REQUEST:
            return{
                   ...state,
                   loading:true 
            }

        case actionTypes.ALL_PRODUCTS_SUCCESS:
            return{
                loading: false,
                product: action.payload 
            }    

        case actionTypes.PRODUCT_DETAIL_FAIL:
            return{
                ...state,
                error: null 
            }

        case actionTypes.CLEAR_ERRORS:
                return{
                        ...state,
                        error: null 
                    }     

        default: 
            return state  
    }

}