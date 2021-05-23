import {configureStore} from '@reduxjs/toolkit';
import reducers from './reducer';
import {routerMiddleware} from 'connected-react-router';
import history from '../utils/history.util';

const store = configureStore({
  reducer:reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;