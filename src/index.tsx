import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.scss';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import history from './utils/history.util';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom'; 

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
