import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

import Content, { HTMLContent } from '../components/Content';
import TagList from '../components/TagList';
import NavbarWithLinks from '../components/NavbarWithLinks';

const Section = styled.div`
  padding-top: 80px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 300;
  padding-bottom: 12px;
`;

const Year = styled.div`
  font-size: 18px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: 300;
`;

const Img = styled.img`
  max-width: 1100px;
  width: 90%;
`;

const ContentWrapper = styled.div`
  margin: auto;
  padding-top: 30px;
  padding-bottom: 50px;
`;

export const ProjectTemplate = ({
  date,
  content,
  contentComponent,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Section>
      {helmet || ''}
      <Year>{date}</Year>
      <Title>{title}</Title>
      {tags && tags.length && <TagList tags={tags} />}
      <ContentWrapper>
        <PostContent content={content} className="post"/>
      </ContentWrapper>
    </Section>
  );
};

ProjectTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
  date: PropTypes.string,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Fragment>
      <NavbarWithLinks />
      <ProjectTemplate
        date={post.frontmatter.date}
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet title={`${post.frontmatter.title} | Project`} />
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Fragment>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY")
        title
        tags
      }
    }
  }
`;
