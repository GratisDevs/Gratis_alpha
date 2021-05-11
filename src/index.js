import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {userState} from './reducers/authenticator.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {combineReducers, applyMiddleware} from 'redux';
import { BrowserRouter } from 'react-router-dom';
import logger from 'redux-logger';

const store= createStore(combineReducers({userState: userState}),applyMiddleware(logger));


ReactDOM.render(
	
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
