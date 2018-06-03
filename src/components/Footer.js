import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: absolute;
  bottom: 40px;
  left: 90px;

  @media(max-width: 480px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Footer = () => (
  <Root>
    2018 -
  </Root>
);

export default Footer;
