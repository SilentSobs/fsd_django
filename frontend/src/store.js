import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetailsReducer: productDetailsReducer
});

const initialState = {};
const middleware = [thunk];

// Safe approach to handle Redux DevTools
let enhancer = applyMiddleware(...middleware);
if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

const store = createStore(
  reducer,
  initialState,
  enhancer
);

export default store;