import {createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducers,productDetailReducer } from './reducers/productReducers';
import {authReducer} from './reducers/userReducer';


const reducer = combineReducers({
        products: productsReducers,
        productDetails: productDetailReducer,
        user: authReducer
});


let initialState = {};

const middlware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middlware)));

export default store;

