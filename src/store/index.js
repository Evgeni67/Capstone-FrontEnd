import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import productsReducers from "../reducers/productsReducers";
import loadingReducers from "../reducers/loadingReducers";
import thunk from 'redux-thunk'

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // whats compose used for?

export const initialState = {
  products: {
    allProducts: [],
    products:[],
    currentCategory:""
  },
  load: {
    loading: false,
  },
};
const bigReducer = combineReducers({ loading: loadingReducers, products:productsReducers });

export default function configureStore() {
  return createStore(
    bigReducer,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  );
}
