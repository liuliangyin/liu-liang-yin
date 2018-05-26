import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link'

import LogoWithName from './LogoWithName';
import github from '../img/github-icon.svg'

const Root = styled.nav`
  position: absolute;
  top: 30px;
  left: 50px;
`;

const MenuWrapper = styled.div`
  padding-top: 70px;
`;

const MenuItem = styled.div`
  font-size: 14;
  font-weight: 500;
  color: #000;
  opacity: ${props => props.active ? 1 : 0.3};
  padding-top: 6px;
  padding-bottom: 6px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  :hover {
    opacity: 1;
  }
`;


class Navbar extends Component {
  state = {  }
  render() {
    return (
      <Root>
        <Link to="/">
          <LogoWithName />
        </Link>
        <MenuWrapper>
          <MenuItem active>Project</MenuItem>
          <MenuItem>Graphic</MenuItem>
          <MenuItem>Illustration</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Contact</MenuItem>
        </MenuWrapper>
      </Root>
    );
  }
}

// const Navbar = () => (
//   <nav className="navbar is-transparent">
//     <div className="container">
//       <div className="navbar-brand">
//         <Link to="/" className="navbar-item">
//           <figure className="image">
//             <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
//           </figure>
//         </Link>
//       </div>
//       <div className="navbar-start">
//         <Link className="navbar-item" to="/about">
//           About
//         </Link>
//         <Link className="navbar-item" to="/products">
//           Products
//         </Link>
//       </div>
//       <div className="navbar-end">
//         <a
//           className="navbar-item"
//           href="https://github.com/AustinGreen/gatsby-netlify-cms-boilerplate"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <span className="icon">
//             <img src={github} alt="Github" />
//           </span>
//         </a>
//       </div>
//     </div>
//   </nav>
// )

export default Navbar
