import React from 'react';
import './Home.css';
import Leftside from './Leftside.js';
import Main from './Main.js';
import NavbarHomeComponent from '../navbar_components/navbarhomecomponent.js';
// import Recommendation from './recommendation.js';
// import { fetchPosts } from '../../actions/PostHandle.js';
// import { connect } from 'react-redux';

class Homepage extends React.Component {
	componentDidMount() {
		console.log('component mounted');
		console.log(this.props);
	}

	componentWillUnmount() {
		console.log('component unmounted');
	}

	render() {
		return (
			<div>
				<NavbarHomeComponent isLoggedIn={this.props.isLoggedIn} logout={this.props.logout} />
				<div
					className="container-fluid m-0"
					style={{ paddingTop: '100px', paddingLeft: '0', paddingRight: '0' }}
				>
					<div className="row m-0">
						<div class="col-md-1" />
						<Main userName={this.props.userName} fetchPosts={this.props.fetchPosts} />
						<Leftside userName={this.props.userName} />
						<div class="col-md-1" />
					</div>
				</div>
			</div>
		);
	}
}

export default Homepage;
