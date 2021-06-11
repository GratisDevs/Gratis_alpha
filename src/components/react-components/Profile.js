import React from 'react';
import { $CombinedState } from 'redux';
import './Profilestyle.css'

document.body.style.backgroundColor = '#e9e9e9' ;
class Profile extends React.Component{
    componentDidMount(){
        console.log("Profile page opened!!");
    }
    render(){
        return(
            <div class="container-fluid m-0" style={{paddingTop: '100px', paddingRight: '100px', paddingLeft: '100px',}}>
                <div class="profile-header">
                    <div class = "profile-img">
                        <img src = "../images/profile-image.jpeg" width = "200"/>

                    </div>
                    <div class = "profile-nav-info">
                        <h3 class = "user-name"><u>Palash Som</u></h3>
                        <div class = "address">
                            <p class="state">CSE,</p>
                            <span class = "country"> KIET Group of Institutions</span>
                        
                        </div>
                    </div>
                    <div class = "profile-option">
                        <div class = "notification">
                            <i class="fa fa-bell"></i>
                            <span class = "alert-message">1</span>
                        </div>
                    </div>
                </div>
                <div class = "main-bd">
                    <div class = "left-side">
                        <div class = "profile-side">
                            <p class = "user-mail">
                                <i class = "fa fa-envelope">
                                </i>
                                   palash.1721cs1084@kiet.edu
                            </p>
                            <div class = "use-bio">
                                <h3><u>Bio</u></h3>
                                <p class = "bio">
                                Lorem Ipsum is simply dummy 
                                text of the printing and 
                                typesetting industry. Lorem 
                                Ipsum has been the industry's 
                                standard dummy text ever since the 
                                1500s, when an unknown printer took 
                                a galley of type and scrambled it to 
                                make a type specimen book.   
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class = "right-side">  
                        <div class="nav">
                            <ul>
                                <li onclick ="tabs(0)"
                                class = "user-post active">POSTS</li>
                                <li onclick = "tabs(1)"
                                class = "user-about">ABOUT</li>
                                <li onclick = "tabs(2)"
                                class = "user-activity">ACTIVITY</li>
                            </ul>
                        </div>
                        <div class = "profile-body">
                            <div class = "profile-posts tab">
                                <h1>POSTS</h1>
                                <p>
                                Lorem Ipsum is simply dummy text 
                                of the printing and typesetting industry. 
                                </p>
                            </div>
                            <div class = "profile-about tab">
                                <h1>ABOUT</h1>
                                <p>Lorem Ipsum is simply dummy text 
                                of the printing and typesetting industry.</p>
                            </div>
                            <div class = "profile-activity">
                                <h1>ACTIVITY</h1>
                                <p>
                                Lorem Ipsum is simply dummy text 
                                of the printing and typesetting industry.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


export default Profile;