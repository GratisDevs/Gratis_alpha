import React from 'react';
import style from './LeftsideStyle';
import { Link } from 'react-router-dom';

class TopMobile extends React.Component{
  constructor(props){
    super(props);
    this.state={
      image: ''
    }
  }
  

  render(){
    return (
    <div className="col-12 hidden-large-screen">
      <style.ArtCard>
        <style.UserInfo>
          <style.CardBackground />
          <div>
            <style.Photo url={this.props.photoURL}/>
            <Link to={`/profile/${this.props.uid}`}>Welcome, {this.props.userName}!</Link>
          </div>
        
          <input type="file" 
          accept="image/*" 
          id="file" 
          style={{display: 'none'}} 
          onChange={(ev)=>{this.props.handleChange(ev)}} />
            <style.AddPhotoText htmlFor="file">Add a photo</style.AddPhotoText>
          
        </style.UserInfo>
      </style.ArtCard>
    </div>
  );}
}

export default TopMobile;