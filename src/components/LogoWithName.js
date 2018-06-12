import React, { PureComponent } from 'react';
import styled from 'styled-components';
import logo from '../img/logo.png';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

// const Logo = styled.div`
//   background: #000;
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   flex: 1;
// `;
// const Logo = styled.img`
//   width: 21px;
//   height: 21px;

//   @media(max-width: 480px) {
//     width: 24px;
//     height: 24px;
//   }
// `;

const Name = styled.div`
  color: #000;
  font-size: 22px;
  font-weight: 500;
  line-height: 21px;

  @media(max-width: 768px) {
    font-size: 24px;
    left: 40px;
  }
`;

class LogoWithName extends PureComponent {
  render() {
    return (
      <Root onClick={() => this.props.onClick()}>
        {/* <Logo /> */}
        {/* <Logo src={logo}/> */}
        <Name>LIU LIANG YIN</Name>
      </Root>
    );
  }
}

export default LogoWithName;
