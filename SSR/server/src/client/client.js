// Startup point for the client side application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';

const axiosInstance = axios.create(
{
  	baseURL: '/api'
});

// window.INITIAL_STATE contains the initial state of the store that we used to render on the server side. window.INITIAL_STATE is global.
// See the return statement of the renderer.js page.
const store = createStore(
	reducers,
	window.INITIAL_STATE,
	applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

const APP = (
	<Provider store = { store }>
		<BrowserRouter>
			<div>{ renderRoutes(Routes) }</div>
		</BrowserRouter>
	</Provider>
);

const container = document.querySelector('#root');

ReactDOM.hydrate(APP, container);