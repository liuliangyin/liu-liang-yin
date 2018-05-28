import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.div`
  background: #000;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex: 1;
`;

const Name = styled.div`
  color: #000;
  padding-left: 10px;
  font-size: 16px;
  font-weight: 500;
`;

class LogoWithName extends PureComponent {
  render() {
    return (
      <Root>
        <Logo />
        <Name>Liu Liang Yin</Name>
      </Root>
    );
  }
}

export default LogoWithName;
