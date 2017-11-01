import {createStore, applyMiddleware} from 'redux';
import reducer from './ducks/reducer';
import promiseMiddleware from 'redux-promise-middleware';

// Create store with Promise Middleware functionality
export default createStore(reducer, applyMiddleware(promiseMiddleware()));