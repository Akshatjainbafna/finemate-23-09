import React, { Component } from "react";
import style from './FooterBarForMobile.module.css';
import { BsBook, BsBookFill, BsChatDots, BsChatDotsFill, BsChatSquareQuote, BsChatSquareQuoteFill, BsHouseDoor, BsHouseDoorFill, BsSearch } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons/lib";



export default function FooterBarForMobile(){
    function HeaderView() {
        const location = useLocation()
        return location.pathname
    }

        return(
            <nav className={style.FooterBarForMobile}>
                <Link to="/dashboard" title="Home">
                    <IconContext.Provider value={{ color: '#834bc4', size: '30px' }} >
                        <div> {HeaderView()=="/dashboard"? <BsHouseDoorFill /> : <BsHouseDoor />} </div>
                    </IconContext.Provider>
                </Link> 
                <Link to="/communities" title="Clubs">
                    <IconContext.Provider value={{ color: '#834bc4', size: '30px' }} >
                        <div> {HeaderView()=="/communities"? <BsChatSquareQuoteFill /> : <BsChatSquareQuote />} </div>
                    </IconContext.Provider>
                </Link> 
                <Link to="/search" title="Search">
                    <IconContext.Provider value={{ color: '#834bc4', size: '30px' }} >
                        <div> <BsSearch /> </div>
                    </IconContext.Provider>
                </Link> 
                <Link to="/messageuser" title="Messages">
                    <IconContext.Provider value={{ color: '#834bc4', size: '30px' }} >
                    <div> {HeaderView()=="/messageuser"? <BsChatDotsFill /> : <BsChatDots />} </div>
                    </IconContext.Provider>
                </Link> 
                <Link to="/allcoursesuser" title="Courses">
                    <IconContext.Provider value={{ color: '#834bc4', size: '30px' }} >
                    <div> {HeaderView()=="/courses"? <BsBookFill /> : <BsBook />} </div>
                    </IconContext.Provider>
                </Link>  
            </nav>
        );
}