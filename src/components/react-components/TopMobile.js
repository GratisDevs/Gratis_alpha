import styled from "styled-components";
import React from 'react';
import style from './LeftsideStyle';

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
          <a href="#">
            <style.Photo url={this.props.photoURL}/>
            <style.Link>Welcome, {this.props.userName}!</style.Link>
          </a>
        
          <input type="file" 
          accept="image/*" 
          id="file" 
          style={{display: 'none'}} 
          onChange={(ev)=>{this.props.handleChange(ev)}} />
            <style.AddPhotoText htmlFor="file">Add a photo</style.AddPhotoText>
          
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
    </div>
  );}
}

export default TopMobile;