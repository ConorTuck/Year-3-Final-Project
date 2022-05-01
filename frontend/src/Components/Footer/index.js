import React from 'react';
import { FooterContainer,DeveloperWrapper,DeveloperName, CopyrightWrapper, Copyright } from './FooterElements';

const Footer = () => {
  return (
    <FooterContainer>
      <DeveloperWrapper>
        <DeveloperName>Developed By Conor</DeveloperName>
      </DeveloperWrapper>
      <CopyrightWrapper>
        <Copyright>Copyright © {new Date().getFullYear()}</Copyright>
      </CopyrightWrapper>
    </FooterContainer>
  );
};

export default Footer;
