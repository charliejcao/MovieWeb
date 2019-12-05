import React from 'react';
import logo from "../assets/movie-web-logo.png";

function Header() {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <ul>
                <li className="header-title">Movie Web - the most popular database for movies</li>
            </ul>
        </header>
    );
}

export default Header;