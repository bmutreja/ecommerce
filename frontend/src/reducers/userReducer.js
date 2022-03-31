import * as actionTypes from '../constant/userConstants';

export const authReducer = (state = {user : {}}, action) => {
    switch(action.type){
        case actionTypes.LOGIN_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,

            }

         case actionTypes.LOGIN_SUCCESS:
             return{
                 ...state,
                 loading: false,
                 isAuthenticated: true,
                 user: action.payload
             }   

         case actionTypes.LOGIN_FAILD:
             return{
                ...state,
                loading:false,
                isAuthenticated: false,
                user: null,
                error: action.payload
             }   
          case actionTypes.CLEAR_ERROR:
              return{
                  ...state,
                  error: null
              }   
             
            default:
                return state;

    }
}


export const registerReducer = (state = {user : {}}, action) => {
    switch(action.type){
        case actionTypes.REGISTER_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,

            }

         case actionTypes.REGISTER_SUCCESS:
             return{
                 ...state,
                 loading: false,
                 isAuthenticated: true,
                 user: action.payload
             }   

         case actionTypes.REGISTER_FAILD:
             return{
                ...state,
                loading:false,
                isAuthenticated: false,
                user: null,
                error: action.payload
             }   
          case actionTypes.CLEAR_ERROR:
              return{
                  ...state,
                  error: null
              }   
             
            default:
                return state;

    }
}