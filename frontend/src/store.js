import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; // ✅ Fixed import
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { userLoginReducer } from './reducers/userReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetailsReducer: productDetailsReducer, // ✅ Fixed key name
  userLogin: userLoginReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;


const initialState = {
  userLogin: { userInfo: userInfoFromStorage }, 
};

const middleware = [thunk];

// Safe Redux DevTools integration
let enhancer = applyMiddleware(...middleware);
if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

// Create Store
const store = createStore(reducer, initialState, enhancer);

export default store;
