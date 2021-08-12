import React from 'react';
import {NavLink} from 'react-router-dom';
// import './LandingPage.css';

export default function LandingPage(){
    return (
        <div className='wallpaper'>
            <NavLink className="enter" to='/home'>
                <span id='text'> Henry Food </span>
            </NavLink>
        </div>
    )
};