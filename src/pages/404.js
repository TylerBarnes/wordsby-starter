import React from "react";
import MetaTag from "../components/MetaTag";
import GridEdges from "../components/gridEdges";
import { css } from "emotion";
import { Link } from "gatsby";

const styles = css`
  min-height: 70vh;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 100px;
  }

  h2 {
    padding: 10px 0;
    text-transform: uppercase;
  }

  p {
    font-size: 30px;
    padding: 10px 0;
  }

  a {
    font-size: 20px;
  }
`;

const NotFoundPage = () => (
  <GridEdges>
    <MetaTag title="Oops!" />
    <div className={styles}>
      <h1>
        Oops!{" "}
        <span role="img" aria-label="Confused emoji">
          😕
        </span>
      </h1>
      <p>
        You're on a page that doesn&#39;t exist...{" "}
        <span role="img" aria-label="Dissapointed emoji">
          😞
        </span>
      </p>

      <Link to={"/"}>
        Go home!{" "}
        <span role="img" aria-label="Crying emoji">
          😭
        </span>
      </Link>
    </div>
  </GridEdges>
);

export default NotFoundPage;
