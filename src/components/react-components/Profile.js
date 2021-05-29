import React from 'react';
import NavbarHomeComponent from '../navbar_components/navbarhomecomponent.js';

class Profile extends React.Component {
	componentDidMount() {
		console.log('Profile page opened!!');
	}
	render() {
		return (
			<div>
				<NavbarHomeComponent />
				<div class="container-fluid m-0" style={{ paddingTop: '100px', paddingRight: '0', paddingLeft: '0' }}>
					<h2>{this.props.userName}</h2>
					<h4>{this.props.email}</h4>
				</div>
			</div>
		);
	}
}

export default Profile;
