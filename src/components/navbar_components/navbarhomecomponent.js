import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import './filter.css';

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

const filterPosts = () => {
    const filter_logo = document.querySelector('.filter-logo');
    const filter = document.querySelector('.filter_links');
    const filterLinks = document.querySelectorAll('.filter_links li');

    filter.classList.toggle('filter-active');
    filter_logo.classList.toggle('filter_toggle');

    filterLinks.forEach((link,index)=>{
        if(link.style.animation){
            link.style.animation = '';
        }else{
            link.style.animation = `filterLinkFade 0.5s ease forwards ${index/7 + 0.5}s`;
        }
    });

    
}



function NavbarMainComponent({uid, logout, fetchPost}) {


    const [drawerStatus,setDrawerStatus] = useState(false);

    const openDrawer = () => {
        
        if(drawerStatus===false)
            setDrawerStatus(true);
        else
            setDrawerStatus(false)
        console.log(drawerStatus);
    }
    

//   useEffect(() => {
//         console.log(drawerStatus);
//   },[drawerStatus]);

  const options = [
        {"value": "Computer Science","name":"Computer Science"},
        {"value": "Electronics","name":"Electronics"},
        {"value": "Mechanical","name":"Mechanical"},
        {"value": "Electrical","name":"Electrical"},
        {"value": "Civil","name":"Civil"}
        ];

  return(
    <nav className="navbar-all">
        <div className="logo">
            <h3><Link to="/" style={{ textDecoration: 'none', }} ><div className="gra-text-logo">GratiS'</div></Link></h3>
        </div>
        <div className="filter_tab" onClick={filterPosts}>
            <svg className="filter-logo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path className="filter_logo_anim"   d="M9.664 15l-8.664-15h22l-8.703 15h-4.633zm2.336 2c-1.407 2.099-2.312 3.412-2.312 4.688 0 1.277 1.035 2.312 2.312 2.312s2.312-1.035 2.312-2.312c0-1.276-.905-2.589-2.312-4.688zm.159 3.007c-.333.833-1.266.622-.765-.465.211-.458.357-.652.598-1.049.198.311.389.959.167 1.514z" fill="white"/>
            </svg>
            <ul className="filter_links">
                {
                    options.map((o)=><li onClick={()=>fetchPost(o.value)}>{o.value}</li>) 
                }
            </ul>
        </div>
        <ul className="nav-links">
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/wiki">Wiki</Link>
            </li>
            <li>
                <Link to={`/profile/${uid}`}>Profile</Link>
            </li>
            <li>
                <Link to="/userSearch">Users</Link>
            </li>
            <li onClick={logout}>
                <a>Logout</a>
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


