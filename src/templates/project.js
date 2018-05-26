import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

import Content, { HTMLContent } from '../components/Content';
import TagList from '../components/TagList';

const Section = styled.div`
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
  max-width: 800px;
  width: 90%;
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
  heroImage,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Section>
      {helmet || ''}
      <Year>{date}</Year>
      <Title>{title}</Title>
      {tags && tags.length && <TagList tags={tags} />}
      <ContentWrapper>
        <PostContent content={content} />
      </ContentWrapper>
      <Img src={heroImage} />
    </Section>
  );
};

ProjectTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
  date: PropTypes.string,
  heroImage: PropTypes.string,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <ProjectTemplate
      date={post.frontmatter.date}
      content={post.html}
      heroImage={post.frontmatter.heroImage}
      contentComponent={HTMLContent}
      helmet={
        <Helmet title={`${post.frontmatter.title} | Project`} />
      }
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
    />
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
        heroImage
        tags
      }
    }
  }
`;
