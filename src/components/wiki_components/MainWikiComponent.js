import React from 'react';
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
        </div>
    );
}

export default MainWikiComponent;