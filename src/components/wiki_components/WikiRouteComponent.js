import React from 'react';
import About from './description_components/About';
import Rules from './description_components/Rules';
import Survey from './description_components/Survey';
import ModsContact from './description_components/ModsContact';
import Contribute from './description_components/Contribute';


export default function({itemLinkProp}) {
        if(itemLinkProp === "About")
            return  <About/>;
        if(itemLinkProp === "Rules")
            return  <Rules/>;
        if(itemLinkProp === "Survey")
            return <Survey/>;
        if(itemLinkProp === "Contact Mods")
            return <ModsContact/>;
        if(itemLinkProp === "Contribute")
            return <Contribute/>;
        else
            return <About/>;
}