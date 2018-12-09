import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import GridEdges from "../../components/gridEdges";

const Page = ({ data }) => {
  const {
    wordpressWpTeam: { title, content }
  } = data;
  return (
    <GridEdges>
      {title && <h2>{title}</h2>}
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </GridEdges>
  );
};

export default Page;

export const wordpressWpTeamQuery = graphql`
  query wordpressWpTeamById($id: String!) {
    wordpressWpTeam(id: { eq: $id }) {
      title
      content
    }
  }
`;
