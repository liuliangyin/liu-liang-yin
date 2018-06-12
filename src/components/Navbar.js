import React, { PureComponent, Fragment } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Transition, animated, interpolate } from 'react-spring';
import Link, { navigateTo } from 'gatsby-link';

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
    `};
  @media (max-width: 768px) {
    top: 30px;
    left: 50px;
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
  transition: all 0.3s ease-in;

  ${({ hide }) =>
    hide &&
    css`
      transform: translateX(-200%);
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

export const NavItem = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${props => (props.overlay ? 'white' : '#000')};
  opacity: ${props => (props.active ? 1 : 0.3)};
  padding-top: 7.5px;
  padding-bottom: 7.5px;
  cursor: pointer;
  transition: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);

  ${({ overlay }) =>
    overlay
      ? css`
          opacity: 1;
          padding-top: 25px;
          padding-bottom: 25px;
          font-size: 22px;

          :hover {
            opacity: 0.8;
          }
        `
      : css`
          :hover {
            transform: rotateX(720deg);
          }

          @media (max-width: 768px) {
            font-size: 18px;
            padding-top: 10px;
            padding-bottom: 10px;
            opacity: 1;
          }
        `};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #000;
  z-index: 9;
  opacity: 0.95;
`;

const Menu = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100%;
  z-index: 12;
  margin: auto;
`;

class Navbar extends PureComponent {
  state = {
    menuShow: false,
  };

  onHomeClick = () => {
    if (this.props.onActiveNavItem && !this.props.inline) {
      this.props.onActiveNavItem(null);
    } else {
      navigateTo('/');
    }
    this.setState({
      menuShow: false,
    });
  };

  render() {
    return (
      <Fragment>
        <Root inline={this.props.inline}>
          <LogoWithName onClick={this.onHomeClick} />
          <MenuWrapper
            inline={this.props.inline}
            hide={this.props.hide}
          >
            <div id="menu-item">{this.props.children}</div>
          </MenuWrapper>
        </Root>
        <Burger
          onClick={() => {
            if (this.props.onActiveNavItem) {
              this.props.onActiveNavItem(null);
            }
            this.setState({ menuShow: !this.state.menuShow });
          }}
          show={this.state.menuShow}
        />
        <Transition
          from={{ x: 100 }}
          enter={{ x: 0 }}
          // leave={{ x: 100 }}
          native
        >
          {this.state.menuShow
            ? ({ x }) => (
                <animated.div
                  style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    zIndex: 9,
                    transform: interpolate(
                      x,
                      x => `translateX(${x}%)`,
                    ),
                  }}
                >
                  <Overlay />
                  <Menu>
                    <NavItem
                      overlay
                      onClick={() => this.onHomeClick()}
                    >
                      Home
                    </NavItem>
                    {React.Children.map(this.props.children, child =>
                      React.cloneElement(child, {
                        overlay: true,
                        onClick: () => {
                          this.setState({
                            menuShow: false,
                          });
                          if (child.props.onClick) {
                            child.props.onClick();
                          }
                        },
                      }),
                    )}
                  </Menu>
                </animated.div>
              )
            : () => null}
        </Transition>
      </Fragment>
    );
  }
}

export default Navbar;
