import React, {useState,useEffect} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import './WebWiki.css';
import WikiRouteComponent from './WikiRouteComponent';

function WebViewComponenet(){

    const leftListItems = [

        {"value": "About","name":"About"},
        {"value": "Rules","name":"Rules"},
        {"value": "Survey","name":"Survey"},
        {"value": "Contact Mods","name":"Contact Mods"},
        {"value": "Contribute","name":"Contribute"}
        
    ]

    const [itemLink,setItemLink] = useState("About");

    const listClickedItem = (listItem) => {
            console.log(listItem);
            setItemLink(listItem);
    }
    

    return (
        <div>
            <Container fluid className="main-container">
                <Row>
                    <Col md={3} className="section-list">
                        {/* Left section */}
                        <ul className="list-links">
                            {leftListItems.map((o)=><li onClick={() => listClickedItem(o.name)}><a href="#">{o.value}</a></li>)}
                        </ul>
                    </Col>
                    <Col md={9}>
                        {/* Right section */}
                        {
                            <WikiRouteComponent itemLinkProp={itemLink}/>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default WebViewComponenet;