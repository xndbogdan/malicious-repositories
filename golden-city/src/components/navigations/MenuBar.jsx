import React from 'react';

import './MenuBar.css'


const MenuBar = () => {
    return (
        <nav className="header">
            <div className="nav-wrapper">
                <a className="logo" href='/'>
                    <svg width="30" height="35" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="20" r="10" stroke="#006EFF"/>
                        <circle cx="15" cy="20" r="6" stroke="#006EFF" strokeWidth="3"/>
                    </svg>                 
                    GoldenCity
                    </a>
                <input className="menu-btn" type="checkbox" id="menu-btn"/>
                <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>

                <ul className="menu">
                    <li><a href="/About">About</a></li>
                    <li><a href="/MarketPlace">MarketPlace</a></li>
                    <li><a href="/FAQ">FAQ</a></li>
                    <li><button className='button'>Connect</button></li>                
                </ul>
            </div>
        </nav>
    )
}

export default MenuBar;
