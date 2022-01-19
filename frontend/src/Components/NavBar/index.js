import React from 'react';
import {Nav, NavBarContainer, NavTitle} from './NavBarElements.js';

const Navbar = () => {
    return(
        <Nav>
            <NavBarContainer>
                <NavTitle to="/">Altcoin Sentiment Tool</NavTitle>
            </NavBarContainer>
        </Nav>
    );
}

export default Navbar;