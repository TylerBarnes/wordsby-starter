import React from "react";
import { css } from "emotion";

const styles = css`
  width: 90%;
  margin: 0 auto;
`;

class GridEdges extends React.Component {
  render() {
    return <section className={styles}>{this.props.children}</section>;
  }
}

export default GridEdges;
