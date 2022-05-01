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
    opacity: 0.9;
`;

export const AssetDropDown = styled.ul`
   // background-color: BLUE;
    display: flex;
    height: 50px;
    margin-top: 17px;
    max-width: 100%;
    justify-content: flex-end;
`;

export const DropDownItem = styled.li`
    display: flex;
    height: 100%;
    max-width: 100%;
    border-radius: 50%;
    justify-content: center; 
`;

export const AssetButton = styled.button`
    background-color: #F6F6F6;
    width: calc(70px * 0.75);
    height :100%;
    max-width: 100%;
    font-size: 1.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding-top: 7px;
    //justify-self: center;
    filter: brightness(0.22);
    
    &:hover {
        cursor: pointer;
        filter: brightness(0.9);
    }
`;

export const DropDownMenu = styled.div`
   background-color: rgb(33, 33, 33);
   position: absolute;
   top: 90px;
   width: 200px;
   height: 120px;
   border-style: double;
   border-color: white;
   border-width: thin;
   border-radius: 3%;
   padding: 1rem;
   overflow: hidden;

   &:hover {
        cursor: pointer;
        transition: all 0.2s unset;
        border-width: 1.5px;
        background-color: rgb(33, 33, 33);
    }
`;

export const AssetWrapper = styled.div`
    background-color: rgb(33, 33, 33);
    border-top: 3px solid rgb(33, 33, 33);
    border-left: 3px solid rgb(33, 33, 33);
    border-right: 3px solid rgb(33, 33, 33);
    border-style: solid;

    &:hover {
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        border-bottom: 3px solid #d36135;
        background-color: rgb(33, 33, 33);  
    }
`;

export const Asset = styled(LinkR)`
    //background-color: WHITE;
    display: inline-block;
    text-decoration: none;
    color: white;
    width: 100%;
    font-size: 1.5rem;
    //border-radius: 10%;
    align-self: center;
    filter: brightness(1);
`;