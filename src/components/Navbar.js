import React, { PureComponent, Fragment } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Link from 'gatsby-link';

import LogoWithName from './LogoWithName';
import Burger from './Burger';

const Root = styled.nav`
  position: absolute;
  top: 60px;
  left: 90px;
  z-index: 1;

  ${({ hide }) =>
    hide &&
    css`
      display: none;
    `} @media (max-width: 768px) {
    top: 33px;
    left: 40px;
  }

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

      @media (max-width: 768px) {
        top: 0;
        left: 0;
      }
    `};
`;

const MenuWrapper = styled.div`
  padding-top: 70px;

  @media (max-width: 768px) {
    padding-left: 35px;
  }

  ${({ hide }) =>
    hide &&
    css`
      display: none;
    `};

  ${({ inline }) =>
    inline &&
    css`
      padding-top: 0;
      #menu-item {
        display: flex;

        @media (max-width: 768px) {
          display: none;
        }
      }
    `};
`;

const flash = keyframes`
 from {transform: rotateX(-180deg)}
  to {transform: rotateX(0deg)}
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

  @media (max-width: 768px) {
    font-size: 18px;
    padding-top: 12.5px;
  }

  :hover {
    animation: ${flash} 250ms;
    animation-duration: 250ms;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #000;
  z-index: 9;
`;

class Navbar extends PureComponent {
  state = {
    menuShow: false,
  };
  render() {
    return (
      <Fragment>
        <Root inline={this.props.inline}>
          <Link to="/">
            <LogoWithName />
          </Link>
          <MenuWrapper
            inline={this.props.inline}
            hide={this.props.hide}
          >
            <div id="menu-item">{this.props.children}</div>
          </MenuWrapper>
        </Root>
        <Burger
          onClick={() => {
            this.setState({ menuShow: !this.state.menuShow });
          }}
          show={this.state.menuShow}
        />
        {this.state.menuShow && <Overlay />}
      </Fragment>
    );
  }
}

export default Navbar;
