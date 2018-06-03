import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import Navbar, { NavItem } from '../components/Navbar';
import { HTMLContent } from '../components/Content';
import Footer from '../components/Footer';
import { AboutPageTemplate } from '../templates/about-page';

const Content = styled.div`
  position: absolute;
  right: 100px;
  top: 150px;

  @media (max-width: 1024px) {
    max-width: 330px;
    right: 130px;
  }

  @media (max-width: 768px) {
    right: unset;
    left: 50%;
    transform: translateX(-50%);
    ${'' /* max-width: 540px; */};
  }

  @media (max-width: 480px) {
    padding-left: 40px;
    padding-right: 40px;
    max-width: unset;
  }
`;

const SubMenu = styled.ul`
  position: absolute;
  left: 216px;
  top: 150px;

  ${({ isPadSize }) =>
    isPadSize &&
    css`
      top: 120px;
      left: 75px;
    `};
`;

const flash = keyframes`
 from {transform: rotateX(-180deg)}
  to {transform: rotateX(0deg)}
`;

const ProjectLi = styled.li`
  line-height: 17px;
  padding: 7.5px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding-top: 12.5px;
  }

  :hover {
    animation: ${flash} 250ms;
    animation-duration: 250ms;
  }
`;

const ProjectYear = styled.div`
  display: inline-block;
  font-size: 12px;
  font-weight: 300;
  color: #000;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ProjectName = styled.div`
  display: inline-block;
  font-size: 13px;
  padding-left: 10px;
  color: #000;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const BackgroundImageWrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: -1;
  top: 0;
  left: 330px;

  @media (max-width: 900px) {
    left: 0;
    top: 0;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export default class IndexPage extends React.Component {
  state = {
    activeIndex: this.props.location.state || 'project',
    backgroundImage: null,
    showImage: false,
    isPadSize: false,
  };

  componentDidMount() {
    this.updateMenu();
    window.addEventListener('resize', this.updateMenu);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMenu);
  }

  updateMenu = () => {
    if (this.wrapper.offsetWidth < 768) {
      if (!this.state.isPadSize) {
        this.setState({ isPadSize: true, activeIndex: null });
      }
    } else {
      if (this.state.isPadSize) {
        this.setState({ isPadSize: false });
      }
    }
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
    const { activeIndex, isPadSize } = this.state;

    return (
      <div
        ref={s => {
          this.wrapper = s;
        }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <Navbar
          className={activeIndex === 'about' ? 'navbar' : ''}
          hide={isPadSize && activeIndex}
        >
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
            <SubMenu isPadSize={isPadSize}>
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
        {this.state.showImage && (
          <BackgroundImageWrapper>
            <img
              src={this.state.backgroundImage}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </BackgroundImageWrapper>
        )}
        <Footer />
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
