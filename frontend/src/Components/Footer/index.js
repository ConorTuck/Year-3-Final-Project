import React from 'react';
import { FooterContainer,DeveloperWrapper,DeveloperName, CopyrightWrapper, Copyright } from './FooterElements';

const Footer = () => {
  return (
    <FooterContainer data-testid='Footer-1'>
      <DeveloperWrapper data-testid='Footer-2'>
        <DeveloperName data-testid='Footer-3'>Developed By Conor</DeveloperName>
      </DeveloperWrapper >
      <CopyrightWrapper data-testid='Footer-4'>
        <Copyright data-testid='Footer-5'>Copyright © {new Date().getFullYear()}</Copyright>
      </CopyrightWrapper>
    </FooterContainer>
  );
};

export default Footer;
