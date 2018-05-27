import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Content, { HTMLContent } from '../components/Content';

const Section = styled.div`
  max-width: 620px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: flex-end;
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 300;
  padding-bottom: 30px;
  text-align: center;
`;

const Image = styled.img`
  width: 260px;
  object-fit: contain;
  box-shadow: none;
`;

export const AboutPageTemplate = ({
  title,
  content,
  contentComponent,
  image,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <Section>
      <Title>
        {title}
      </Title>
      <Wrapper>
        <PageContent className="content" content={content} />
        <Image src={image}/>
      </Wrapper>
    </Section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      image={post.frontmatter.image}
      content={post.html}
    />
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        image
        title
      }
    }
  }
`;
