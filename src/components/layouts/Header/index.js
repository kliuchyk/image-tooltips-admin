import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

export default function AppHeader() {
  return (
    <StyledHeader>
      <AppTitle level={3}>Admin panel</AppTitle>
      <MenuLinks>
        <Link activeClassName='selected-route' to='/images'>
          VIEW IMAGES
        </Link>
        <Link activeClassName='selected-route' to='/add-new'>
          ADD NEW IMAGES
        </Link>
      </MenuLinks>
    </StyledHeader>
  );
}

const MenuLinks = styled.div`
  display: flex;

  @media (max-width: 500px) {
    width: 100%;
    justify-content: space-evenly;
  }
`;

const Link = styled(NavLink)`
  color: #fff;
  padding: 0 14px;
  font-size: 16px;
  font-family: Barlow Semi Condensed;
  transition: all 0.3s;

  &:hover {
    color: #fff;
    background: #333;
  }

  @media (max-width: 500px) {
    width: 100%;
    text-align: center;
  }
`;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #757575;

  @media (max-width: 500px) {
    flex-direction: column;
    height: auto;
    padding: 0;
  }
`;

const AppTitle = styled(Title)`
  &.ant-typography {
    margin: 0;
    color: #fff;
    text-transform: uppercase;
    font-family: Barlow Semi Condensed;

    @media (max-width: 500px) {
      margin: 20px 0 20px;
    }
  }
`;
