import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

import Navbar, { NavItem as Item } from './Navbar';

const NavItem = styled(Item)`
  margin-left: 35px;
`;

class NavbarWithLinks extends PureComponent {
  state = {};
  render() {
    return (
      <Navbar inline>
          <Link to={{ pathname:"/", state: "project" }}>
            <NavItem>Project</NavItem>
          </Link>
          <Link to={{ pathname: "/", state: "graphic"}}>
            <NavItem>Graphic</NavItem>
          </Link>
          <NavItem>Illustration</NavItem>
          <NavItem>Profile</NavItem>
          <NavItem>Contact</NavItem>
      </Navbar>
    );
  }
}

export default NavbarWithLinks;
