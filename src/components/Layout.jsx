import React from 'react';
import { Outlet } from 'react-router-dom';

import OrnamentImg from '../assets/images/ornament-side.png';
//import components
import SideBar from './Navigation';
import Header from './Header';

import styled from 'styled-components';

//styles
const Container = styled.section`
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;
const Content = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: scroll;
`;
const TopContent = styled.div`
  height: 100px;
`;
const Image = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -99;
  opacity: 0.5;
`;

const Layout = () => {
  return (
    <Container>
      <SideBar />
      <Content>
        <TopContent>
          <Header />
        </TopContent>
        <Outlet />
      </Content>
    </Container>
  );
};

export default Layout;
