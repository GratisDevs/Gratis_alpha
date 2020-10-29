import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { combineReducers} from 'redux';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


const numState=(state={number:0},action)=>{
	switch(action.type){
		case 'INCREAMENT': return {...state,number:state.number+1};
		case 'DECREAMENT': return {...state,number:state.number-1};
		default: return {...state};
	}
}

const store= createStore(combineReducers({numState: numState}));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
