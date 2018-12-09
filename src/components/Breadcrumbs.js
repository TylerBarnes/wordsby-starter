import React from "react";
import { css } from "emotion";

// import app components
import Color from "./Color";

const styles = css`
  position: absolute;
  z-index: 100;
  top: 80px;
  display: flex;
  margin: 0 0 10px;
  padding-left: 20px;

  @media screen and (min-width: 640px) {
    top: 120px;
  }

  &:before {
    content: "<";
    position: absolute;
    left: 0;
    top: -5px;
    width: 20px;
    height: 20px;
    font-size: 22px;
    color: ${Color.red};
  }

  a {
    text-decoration: none;
    text-transform: uppercase;
  }
`;

const Breadcrumbs = props => <div className={styles}>{props.children}</div>;

export default Breadcrumbs;
