import React from "react";
import style from './LeftsideStyle.js';


class Leftside extends React.Component{
  
    render(){
  return (
    <div className="col-md-3 hidden">
      <style.ArtCard>
        <style.UserInfo>
          <style.CardBackground />
          <div>
            <style.Photo url={this.props.photoURL} />
            <style.Link>Welcome, {this.props.userName}!</style.Link>
          </div>
          <input type="file" 
          accept="image/*" 
          id="file" 
          style={{display: 'none'}} 
          onChange={(ev)=>{this.props.handleChange(ev)}} />
            <style.AddPhotoText htmlFor="file">Add a photo</style.AddPhotoText>
        </style.UserInfo>
        
        
      </style.ArtCard>
    <style.CommunityCard>
      <div className="testimonial-group">
      <h3>Trending Articles</h3>
  <div className="row text-center">
    <div className="col-4">1</div>
 <div className="col-4">2</div>
<div className="col-4">3</div>
 <div className="col-4">4</div>
 <div className="col-4">5</div>
 <div className="col-4">6</div>
 <div className="col-4">7</div>
 <div className="col-4">8</div>
 <div className="col-4">9</div>
  </div>
</div>
    </style.CommunityCard>
    </div>
  );
    }
};

export default Leftside;