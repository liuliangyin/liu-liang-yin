import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import favicon from '../favicon.ico';

import './reset.css';
import './all.scss';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet>
        <base target="_blank" />
        {/* <title>Liu Liang Yin</title> */}
        <link rel='shortcut icon' type='image/x-icon' href={favicon} />
    </Helmet>
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
