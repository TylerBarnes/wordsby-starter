import React from "react";
import { graphql } from "gatsby";
import Parser from "html-react-parser";
import { PsychicWindow } from "wordsby-components";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

export default function contact(props) {
  const { post_title, post_content } = props;

  return (
    <>
      <h1>Contact Template</h1>
      {!!post_title && <h2>{post_title}</h2>}
      {!!post_content && <div>{Parser(post_content)}</div>}

      <h2>Contact form 7 with no styles</h2>
      <PsychicWindow url="http://wordsby.test/psychic-window/contact-form-7-example/">
        <ReactPlaceholder type="media" rows={9} ready={false}>
          {" "}
        </ReactPlaceholder>
      </PsychicWindow>

      <h2>Same contact form 7 with injected styles</h2>
      <PsychicWindow
        url="http://wordsby.test/psychic-window/contact-form-7-example/"
        windowCSS={`
        html {
          background: rebeccapurple;
        }
        `}
      >
        <ReactPlaceholder type="media" rows={9} ready={false}>
          {" "}
        </ReactPlaceholder>
      </PsychicWindow>
    </>
  );
}

export const CollectionQuery = graphql`
  query ContactTemplate($id: Int!) {
    wordsbyCollections(ID: { eq: $id }) {
      post_title
      post_content
    }
  }
`;
