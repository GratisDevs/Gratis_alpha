import React from "react";
import style from './LeftsideStyle.js';


class Leftside extends React.Component{
    render(){
  return (
    <div className="col-md-3 hidden">
      <style.ArtCard>
        <style.UserInfo>
          <style.CardBackground />
          <a href="#">
            <style.Photo url={this.props.photoURL} />
            <style.Link>Welcome, {this.props.userName}!</style.Link>
          </a>
          <a href="#">
            <style.AddPhotoText>Add a photo</style.AddPhotoText>
          </a>
        </style.UserInfo>
        <style.Widget>
          <a href="#">
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src="/images/widget-icon.svg" alt="" />
          </a>
        </style.Widget>
        <style.Item>
          <span>
            <img src="/images/item-icon.svg" alt="" />
            My Items
          </span>
        </style.Item>
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