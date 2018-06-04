import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';

const Burger = ({ onClick, show }) => (
  <Fragment>
    <input
      id="burger"
      type="checkbox"
      onClick={onClick}
      checked={show}
    />
    <label htmlFor="burger" id="burger-line">
      <span />
      <span />
    </label>
  </Fragment>
);

export default Burger;
