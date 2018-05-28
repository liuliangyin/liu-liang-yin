import { default as GraphicPage } from './project';

export default GraphicPage;

export const pageQuery = graphql`
  query GraphicByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY")
        title
        tags
        heroImage
        galleryImages
      }
    }
  }
`;
