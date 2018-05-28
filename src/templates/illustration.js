import { default as illustrationPage } from './project';

export default illustrationPage;

export const pageQuery = graphql`
  query illustrationByID($id: String!) {
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
