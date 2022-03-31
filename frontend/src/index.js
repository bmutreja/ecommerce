import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import {positions,transitions,Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'
import 'jquery/dist/jquery'


const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
  transition: transitions.FADE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);


