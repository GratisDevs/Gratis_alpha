import React from 'react';

import {connect} from 'react-redux';

import './App.css';

class App extends React.Component{
	render(){return (<div className="App">
		<button onClick={this.props.decrease}>Decrease</button>
		<p>{this.props.number}</p>
		<button onClick={this.props.increase}>Increase</button>
		</div>);}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		increase: ()=> dispatch({
			type: 'INCREAMENT'
		}),
		decrease: ()=>dispatch({
			type: 'DECREAMENT'
		})
	}
}

const mapstateToProps=(state)=>{
	return {
		number: state.numState.number
	}
}

export default connect(mapstateToProps,mapDispatchToProps)(App);
