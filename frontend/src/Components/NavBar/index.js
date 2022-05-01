import React, { useEffect, useState } from 'react';
import {Nav, NavBarContainer, NavTitle, AssetDropDown, DropDownItem, AssetButton, Asset, DropDownMenu, AssetWrapper} from './NavBarElements.js';

const Navbar = () => {

    const [assetChoice, openAssetChoice] = useState(false)

    return(
        <Nav>
            <NavBarContainer>
                <NavTitle to="/">Sentiment Tool</NavTitle>
                <AssetDropDown>
                    <DropDownItem onClick={() =>{openAssetChoice(!assetChoice)}}>
                    <AssetButton onClick={() =>{openAssetChoice(!assetChoice)}}>⮟</AssetButton>
                    {assetChoice &&
                    <DropDownMenu>
                        <AssetWrapper>
                            <Asset to="/Eosio">Eosio</Asset> 
                        </AssetWrapper>
                        <AssetWrapper>
                            <Asset to="/BitcoinSV">Bitcoin SV</Asset> 
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