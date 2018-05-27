import React, { PureComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Link from 'gatsby-link';

import LogoWithName from './LogoWithName';
import github from '../img/github-icon.svg';

const Root = styled.nav`
  position: absolute;
  top: 30px;
  left: 50px;
  z-index: 1;

  ${({ inline }) =>
    inline &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 80px;
      display: flex;
      align-items: center;
      padding-left: 50px;
      padding-right: 50px;
      justify-content: space-between;
      background: #fdfdfd;
    `};
`;

const MenuWrapper = styled.div`
  padding-top: 70px;
  ${({ inline }) =>
    inline &&
    css`
      padding-top: 0;
      display: flex;
    `};
`;

const flash = keyframes`
  0% {opacity: 0;}
  20% {opacity: 1;}
  40% {opacity: 0;}
  60% {opacity: 1;}
  80% {opacity: 0;}
  100% {opacity: 1;}
`;

export const NavItem = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  opacity: ${props => (props.active ? 1 : 0.3)};
  padding-top: 6px;
  padding-bottom: 6px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  :hover {
    animation: ${flash} 250ms;
  }
`;

class Navbar extends PureComponent {
  state = {};
  render() {
    return (
      <Root inline={this.props.inline}>
        <Link to="/">
          <LogoWithName />
        </Link>
        <MenuWrapper inline={this.props.inline}>
          {this.props.children}
        </MenuWrapper>
      </Root>
    );
  }
}

export default Navbar;
