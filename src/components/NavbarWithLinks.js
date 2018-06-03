import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

import Navbar, { NavItem as Item } from './Navbar';
import Burger from './Burger';

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
          <Link to={{ pathname: "/", state: "illustration"}}>
            <NavItem>Illustration</NavItem>
          </Link>
          <Link to={{ pathname: "/", state: "about"}}>
            <NavItem>About</NavItem>
          </Link>
      </Navbar>
    );
  }
}

export default NavbarWithLinks;
