import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { kebabCase } from 'lodash';

const Tag = styled.li`
  display: block;
  font-size: 15px;
  color: #000;
  font-weight: 400;
  position: relative;
  line-height: 30px;
  }
`;

const TagList = ({ tags }) => (
  <ul>
    {tags.map(tag => (
    <Tag key={tag + `tag`}>
      {/* <Link to={`/tags/${kebabCase(tag)}/`}> */}
      {tag}
      {/* </Link> */}
    </Tag>
    ))}
  </ul>
);

TagList.PropTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default TagList;
