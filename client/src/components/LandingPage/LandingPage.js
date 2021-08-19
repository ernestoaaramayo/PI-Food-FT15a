import React from 'react';
import {NavLink} from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage(){
    return (
        <div>
            <div className='wallpaperLP'/>
            <div className="buttonContainer">
                <NavLink className='btnLink' to='/home'>
                    <span id='text' className='glow-on-hover'> Henry Food </span>
                </NavLink>
            </div>
        </div>
    )
};