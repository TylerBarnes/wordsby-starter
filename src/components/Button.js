import React from "react";
import { Link } from "@reach/router";
import { css } from "emotion";

import Color from "../components/Color";

const styles = css`
  display: inline-block;
  position: relative;

  a {
    padding: 10px 20px;
    color: ${Color.font.h};
    border: 1px solid ${Color.font.h};
    text-decoration: none;
    letter-spacing: 1px;
    font-size: 1rem;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    transition: all 700ms ease;

    &:hover {
      color: white;
      border: 1px solid ${Color.red};
      .blobs {
        div {
          transform: scale(1.5) translateY(0) translateZ(0);
        }
      }
    }
  }

  .blobs {
    height: 100%;
    filter: url(#goo);
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: -3px;
    right: -1px;
    z-index: -1;

    div {
      background-color: ${Color.red};
      width: 34%;
      height: 100%;
      border-radius: 100%;
      position: absolute;
      transform: scale(1.4) translateY(125%) translateZ(0);
      transition: all 700ms ease;

      &:nth-child(1) {
        left: -5%;
      }
      &:nth-child(2) {
        left: 30%;
        transition-delay: 60ms;
      }
      &:nth-child(3) {
        left: 66%;
        transition-delay: 25ms;
      }
    }
  }
`;

export default ({ to, children }) => (
  <div className={styles}>
    <Link to={to}>
      {children}

      <div class="blobs">
        <div />
        <div />
        <div />
      </div>
    </Link>
  </div>
);
