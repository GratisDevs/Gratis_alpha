import React from 'react';
import useWindowDimensions from '../data_components/useWindowDimenesions';
import MobViewComponenet from './MobViewComponent';
import WebViewComponenet from './WebViewComponent';

function MainWikiComponent({isLoggedIn,logout, fetchPost}){

    const { height, width } = useWindowDimensions();

    console.log(` height :${height} , width :${width}`);

    return (
        <div>
            {(width>= 768)? <WebViewComponenet/> : <MobViewComponenet/>}
        </div>
    );
}

export default MainWikiComponent;
