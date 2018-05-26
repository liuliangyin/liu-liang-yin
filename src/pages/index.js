import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import Navbar, { NavItem } from '../components/Navbar';

const Content = styled.div``;

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
`;

const ProjectName = styled.div`
  display: inline-block;
  font-size: 12px;
  padding-left: 10px;
`;

const BackgroundImage = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
`;

export default class IndexPage extends React.Component {
  state = {
    activeIndex: null,
    backgroundImage: null,
  };

  onActiveNavItem = activeIndex => {
    this.setState({
      activeIndex,
    });
  };

  onChangeBackground = image => {
    this.setState({
      backgroundImage: image,
    });
  };

  render() {
    const { data } = this.props;
    const { activeIndex } = this.state;
    // const { edges } = data.allMarkdownRemark;

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
          <NavItem>Profile</NavItem>
          <NavItem>Contact</NavItem>
        </Navbar>
        {activeIndex && (
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
                  onMouseLeave={() => this.onChangeBackground(null)}
                >
                  <Link to={post.fields.slug}>
                    <ProjectYear>{post.frontmatter.date}</ProjectYear>
                    <ProjectName>
                      {post.frontmatter.title}
                    </ProjectName>
                  </Link>
                </ProjectLi>
              ))}
          </SubMenu>
        )}
        <Content />
        <BackgroundImage>
          <img src={this.state.backgroundImage} />
        </BackgroundImage>
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
  }
`;
