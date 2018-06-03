import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: absolute;
  right: 40px;
  top: 30px;
  width: 45px;
  height: 45px;
  cursor: pointer;
  padding: 12.5px 7px;
  transition: all 0.1s ease-out;
  z-index: 10;
  :hover {
    opacity: 0.5;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const Line = styled.div`
  position: absolute;
  width: 25px;
  height: 2px;
  background: ${props => props.show ? 'white' : 'black'};
  transition: all 0.2s ease-in;
`;

const TopLine = styled(Line)`
  transform: ${props => props.show ? 'rotate(45deg)' : 'none'};
`;

const BottomLine = styled(Line)`
  transform: ${props => props.show ? 'rotate(-45deg)' : 'none'};
  ${'' /* top: 22px; */}
`;

const Burger = ({ onClick, show }) => (
  <Root onClick={onClick}>
    <TopLine show={show} />
    <BottomLine show={show} />
  </Root>
);

export default Burger;
