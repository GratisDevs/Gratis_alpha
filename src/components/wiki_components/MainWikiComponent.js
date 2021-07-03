import React from 'react';
<<<<<<< HEAD
import useWindowDimensions from '../data_components/useWindowDimenesions';
import NavbarMainComponent from '../navbar_components/navbarhomecomponent';
import MobViewComponenet from './MobViewComponent';
import WebViewComponenet from './WebViewComponent';

function MainWikiComponent({isLoggedIn,logout, fetchPost}){

    const { height, width } = useWindowDimensions();

    console.log(` height :${height} , width :${width}`);

    return (
        <div>
            <NavbarMainComponent isLoggedIn={isLoggedIn} logout={logout} fetchPost={fetchPost}/>
            {(width>= 768)? <WebViewComponenet/> : <MobViewComponenet/>}
=======
import './Wiki.css';

function MainWikiComponent({isLoggedIn,logout, fetchPost}){
    //Don't remove the 100px inline style otherwise the component will hide behind the navbar
    return (
        <div style={{marginTop: '100px'}}> 
            <div>

            </div>
>>>>>>> 6900a9620ba36e1dc2b1e58e466e949e33d26fb3
        </div>
    );
}

export default MainWikiComponent;
