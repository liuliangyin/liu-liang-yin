import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { Transition, animated } from 'react-spring';

import Navbar, { NavItem } from '../components/Navbar';
import { HTMLContent } from '../components/Content';
import { AboutPageTemplate } from '../templates/about-page';

const Content = styled.div`
  position: absolute;
  left: 470px;
  top: 150px;
`;

const SubMenu = styled.ul`
  position: absolute;
  left: 255px;
  top: 120px;
`;

const ProjectLi = styled.li`
  line-height: 17px;
  height: 17px;
  margin-bottom: 15px;
  cursor: pointer;
`;

const ProjectYear = styled.div`
  display: inline-block;
  font-size: 10px;
  font-weight: 300;
  color: #000;
`;

const ProjectName = styled.div`
  display: inline-block;
  font-size: 12px;
  padding-left: 10px;
  color: #000;
`;

const BackgroundImageWrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: -1;

  @media (max-width: 900px) {
    left: 0;
    top: 0;
  }
`;

export default class IndexPage extends React.Component {
  state = {
    activeIndex: this.props.location.state || 'project',
    backgroundImage: null,
    showImage: false,
  };

  onActiveNavItem = activeIndex => {
    this.setState({
      activeIndex,
    });
  };

  onChangeBackground = image => {
    if (image) {
      this.setState({
        backgroundImage: image,
        showImage: true,
      });
    } else {
      this.setState({
        showImage: false,
      });
    }
  };

  render() {
    const { data } = this.props;
    const { activeIndex } = this.state;

    return (
      <div>
        <Navbar>
          <NavItem
            onClick={() => this.onActiveNavItem('project')}
            active={activeIndex === 'project'}
          >
            Project
          </NavItem>
          <NavItem
            onClick={() => this.onActiveNavItem('graphic')}
            active={activeIndex === 'graphic'}
          >
            Graphic
          </NavItem>
          <NavItem
            onClick={() => this.onActiveNavItem('illustration')}
            active={activeIndex === 'illustration'}
          >
            Illustration
          </NavItem>
          <NavItem
            onClick={() => this.onActiveNavItem('about')}
            active={activeIndex === 'about'}
          >
            About
          </NavItem>
        </Navbar>
        {activeIndex &&
          activeIndex !== 'about' && (
            <SubMenu>
              {data[activeIndex] &&
                data[activeIndex].edges.map(({ node: post }) => (
                  <ProjectLi
                    key={post.id}
                    onMouseEnter={() =>
                      this.onChangeBackground(
                        post.frontmatter.heroImage,
                      )
                    }
                    onMouseLeave={() => this.onChangeBackground()}
                  >
                    <Link to={post.fields.slug}>
                      <ProjectYear>
                        {post.frontmatter.date}
                      </ProjectYear>
                      <ProjectName>
                        {post.frontmatter.title}
                      </ProjectName>
                    </Link>
                  </ProjectLi>
                ))}
            </SubMenu>
          )}
        {activeIndex &&
          activeIndex === 'about' && (
            <Content>
              <AboutPageTemplate
                contentComponent={HTMLContent}
                title={data.about.frontmatter.title}
                image={data.about.frontmatter.image}
                content={data.about.html}
              />
            </Content>
          )}
        <Transition
          native
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {this.state.showImage
            ? ({ opacity }) => (
                <BackgroundImageWrapper>
                  <animated.img
                    src={this.state.backgroundImage}
                    style={{
                      opacity,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </BackgroundImageWrapper>
              )
            : () => null}
        </Transition>
      </div>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const pageQuery = graphql`
  query IndexQuery {
    project: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "project" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "YYYY")
            heroImage
          }
        }
      }
    }
    graphic: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "graphic" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "YYYY")
            heroImage
          }
        }
      }
    }
    illustration: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "illustration" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "YYYY")
            heroImage
          }
        }
      }
    }
    about: markdownRemark(
      frontmatter: { templateKey: { eq: "about-page" } }
    ) {
      html
      frontmatter {
        image
        title
      }
    }
  }
`;
