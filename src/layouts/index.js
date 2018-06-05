import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './reset.css';
import './all.scss';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Liu Liang Yin" />
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
