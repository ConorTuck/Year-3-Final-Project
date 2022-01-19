import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'

export const Nav = styled.nav`
    background: rgb(33, 33, 33);
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
`;

export const NavBarContainer = styled.div`
    height: 80px;
    padding: 0 24px;
    max-width: 1100px;
    z-index: 1;
    justify-content: space-between;
    width: 100%;
    display: flex;
`;

export const NavTitle = styled(LinkR)`
    color: #F6F6F6;
    font-weight: bold;
    font-size: 2rem;
    display: flex;
    justify-self: flex-start;
    text-decoration: none;
    align-items: center;
`;

