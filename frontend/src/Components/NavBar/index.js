import React, { useEffect, useState } from 'react';
import {Nav, NavBarContainer, NavTitle, AssetDropDown, DropDownItem, AssetButton, Asset, DropDownMenu, AssetWrapper} from './NavBarElements.js';

const Navbar = () => {

    const [assetChoice, openAssetChoice] = useState(false)

    return(
        <Nav data-testid={'navbar-1'}>
            <NavBarContainer data-testid={'navbar-2'}>
                <NavTitle data-testid={'navbar-3'} to="/">Sentiment Tool</NavTitle>
                <AssetDropDown data-testid={'navbar-4'}>
                    <DropDownItem data-testid={'navbar-5'} onClick={() =>{openAssetChoice(!assetChoice)}}>
                    <AssetButton data-testid={'navbar-6'} onClick={() =>{openAssetChoice(!assetChoice)}}>⮟</AssetButton>
                    {assetChoice &&
                    <DropDownMenu data-testid={'navbar-7'}>
                        <AssetWrapper data-testid={'navbar-8'}>
                            <Asset data-testid={'navbar-9'} to="/Eosio">Eosio</Asset> 
                        </AssetWrapper>
                        <AssetWrapper data-testid={'navbar-10'}>
                            <Asset data-testid={'navbar-11'} to="/BitcoinSV">Bitcoin SV</Asset> 
                        </AssetWrapper>
                    </DropDownMenu>   
                    }
                    </DropDownItem>
                </AssetDropDown>
            </NavBarContainer>
        </Nav>
    );
}

export default Navbar;