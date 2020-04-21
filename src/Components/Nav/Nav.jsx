import React from 'react';

const Nav = (props) => {
    return (
        <nav className="nav">
            <div className="nav-logo">
                <a href="/"><img src="/assets/Logo.svg" alt="COVID-19 logo"/></a>
            </div>
            <ul className="nav-list">
                <li><a className="nav__text-link" href="/">All Cases</a></li>
                <li><a className="nav__text-link" href="/country">Country</a></li>
            </ul>
        </nav>
    )
}
export default Nav;