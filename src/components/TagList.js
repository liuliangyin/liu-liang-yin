import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { kebabCase } from 'lodash';

const Tag = styled.li`
  display: inline-block;
  font-size: 18px;
  color: #777777;
  font-weight: 300;
  position: relative;

  :not(:first-child) {
    margin-left: 30px;

    &:before {
      position: absolute;
      content: "/";
      left: -17px;
    }
  }
`;

const TagList = ({ tags }) => (
  <ul>
    {tags.map(tag => (
    <Tag key={tag + `tag`}>
      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
    </Tag>
    ))}
  </ul>
);

TagList.PropTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default TagList;
