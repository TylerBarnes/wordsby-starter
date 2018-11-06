import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import GridEdges from "../../components/gridEdges";

const Page = ({ data }) => {
  const {
    wordpressPage: { title, content }
  } = data;
  return (
    <GridEdges>
      {title && <h2>{title}</h2>}
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </GridEdges>
  );
};

Page.propTypes = {
  data: PropTypes.object.isRequired
};
Page.defaultProps = {
  menuLogo: true
};
export default Page;

export const pageQuery = graphql`
  query PageById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
    }
  }
`;
