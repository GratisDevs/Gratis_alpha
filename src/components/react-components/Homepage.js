import React from 'react';
import './Home.css';
import Leftside from './Leftside.js';
import Main from './Main.js';
import { Link } from 'react-router-dom';
import TopMobile from './TopMobile';
import { connect } from 'react-redux';
import {changeProfile} from '../../actions/changeProfile';
// import Recommendation from './recommendation.js';
// import { fetchPosts } from '../../actions/PostHandle.js';
// import { connect } from 'react-redux';

class Homepage extends React.Component {

	handleChange=(ev)=>{
		const image=ev.target.files[0];
	
		if(image===''||image===undefined){
			alert("Not an image!");
			return;
		}

		this.props.dispatch(changeProfile(image,this.props.userName));
		
	}

	render() {
		return (
			<div>
				
				<div
					className="container-fluid m-0"
					style={{ paddingTop: '100px', paddingLeft: '0', paddingRight: '0' }}
				>
					
					<div className="row m-0">
						<div class="col-md-2" />
						<TopMobile userName={this.props.userName} photoURL={this.props.photoURL} handleChange={this.handleChange} />
						<Main userName={this.props.userName} fetchPosts={this.props.fetchPosts} />
						<Leftside userName={this.props.userName} photoURL={this.props.photoURL} handleChange={this.handleChange} />
						<div class="col-md-1" />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps=(state)=>({})

export default connect(mapStateToProps)(Homepage);
