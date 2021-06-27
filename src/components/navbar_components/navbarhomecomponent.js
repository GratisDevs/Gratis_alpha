import React, {useState} from 'react';
import './navbar.css';

const navSlide = () =>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle nav-links
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link,index)=>{
        if(link.style.animation){
            link.style.animation = '';
        }else{
            link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.5}s`;
        }
    });

    // Burger animation
    burger.classList.toggle('toggle');

    
}

function NavbarMainComponent({isLoggedIn,logout, fetchPost}) {
  return(
    <nav className="navbar-all">
        <div className="logo">
            <h3>GratiS'</h3>
        </div>
        <ul className="nav-links">
            <li>
                <a href="#">Home</a>
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#">Work</a>
            </li>
            <li>
                <a href="#">Projects</a>
            </li>
        </ul>
        <div className="burger" onClick={navSlide}>
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
        </div>
    </nav>
  );
}

export default NavbarMainComponent;