import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

import Navbar, { NavItem } from './Navbar';

class NavbarWithLinks extends PureComponent {
  render() {
    const { overlay } = this.props;

    return (
      <Navbar inline onActiveNavItem={this.props.onToggleBurger}>
          <Link to={{ pathname:"/", state: "project" }}>
            <NavItem overlay={overlay} style={{ marginLeft: overlay ? 0 : '35px'}}>Project</NavItem>
          </Link>
          <Link to={{ pathname: "/", state: "graphic"}}>
            <NavItem overlay={overlay} style={{ marginLeft: overlay ? 0 : '35px'}}>Graphic</NavItem>
          </Link>
          <Link to={{ pathname: "/", state: "illustration"}}>
            <NavItem overlay={overlay} style={{ marginLeft: overlay ? 0 : '35px'}}>Illustration</NavItem>
          </Link>
          <Link to={{ pathname: "/", state: "about"}}>
            <NavItem overlay={overlay} style={{ marginLeft: overlay ? 0 : '35px'}}>About</NavItem>
          </Link>
      </Navbar>
    );
  }
}

export default NavbarWithLinks;
