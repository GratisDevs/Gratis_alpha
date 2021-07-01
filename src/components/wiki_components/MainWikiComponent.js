import React from 'react';
import NavbarMainComponent from '../navbar_components/navbarhomecomponent';
import './Wiki.css';

function MainWikiComponent({isLoggedIn,logout, fetchPost}){
    return (
        <div>
            <NavbarMainComponent isLoggedIn={isLoggedIn} logout={logout} fetchPost={fetchPost}/>
            <div>

            </div>
        </div>
    );
}

export default MainWikiComponent;