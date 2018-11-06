import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import GridEdges from "../../components/gridEdges";

const Page = ({ data }) => {
  const {
    wordpressDefault: { title, content }
  } = data;
  return (
    <GridEdges>
      {title && <h2>{title}</h2>}
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </GridEdges>
  );
};

export default Page;

export const defaultQuery = graphql`
  query DefaultById($id: String!) {
    wordpressDefault(id: { eq: $id }) {
      title
      content
    }
  }
`;
