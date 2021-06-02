import styled from "styled-components";
import React from 'react';
import style from './LeftsideStyle';

class TopMobile extends React.Component{
  constructor(props){
    super(props);
    this.state={
      photoURL: '/images/photo.svg'
    }
  }

  componentDidMount(){
    if(this.props.photoURL!==''){
      this.setState({
        photoURL: this.props.photoURL
      })
    }
  }

  render(){
    return (
    <div className="col-12 hidden-large-screen">
      <style.ArtCard>
        <style.UserInfo>
          <style.CardBackground />
          <a href="#">
            <style.Photo url={this.state.photoURL}/>
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
    </div>
  );}
}

export default TopMobile;