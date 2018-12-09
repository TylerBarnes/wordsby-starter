import React from "react";
import { css } from "emotion";

// Import app components
import Color from "./Color";

const hamburgerStyles = css`
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
  color: ${Color.lightGrey};
  font-size: 14px;
  display: inline-block;
  font-family: proxima-nova, sans-serif;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  z-index: 200;
  margin-bottom: 14px;

  @media screen and (min-width: 640px) {
    left: 5%;
    top: 50px;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .site-navigation-button {
    width: 28px;
    position: relative;
  }

  .site-navigation-button span {
    border-top: 2px solid ${Color.red};
    display: block;
  }

  .site-navigation-button .top {
    margin-bottom: 7px;
  }
  .site-navigation-button .middle {
    margin: 7px 0;
  }

  .site-navigation-button .top,
  .site-navigation-button .middle,
  .site-navigation-button .bottom {
    -webkit-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
    cursor: pointer;
  }

  &.menu-open .site-navigation-button .top {
    -webkit-transform: rotate(45deg) translate(6px, 6px);
    transform: rotate(45deg) translate(6px, 6px);
  }

  .menu-open .site-navigation-button .middle {
    opacity: 0;
  }

  .menu-open .site-navigation-button .bottom {
    -webkit-transform: rotate(-45deg) translate(5px, -6px);
    transform: rotate(-45deg) translate(5px, -6px);
  }

  .labels {
    height: 17px;
    overflow-y: hidden;
    padding-left: 11px;
    margin-top: -4px;

    * {
      color: #6a6a6a;
    }
  }

  .labels-inner {
    transition: 0.5s all ease;
  }
`;

const menuOpenStyles = css`
  position: fixed !important;

  .labels-inner {
    transform: translateY(-50%);
  }
  .site-navigation-button span {
    border-top: 2px solid white;
  }

  .labels {
    * {
      color: white;
    }
  }
`;

const Hamburger = props => (
  <div
    className={css`
      ${hamburgerStyles} ${props.menuOpen && menuOpenStyles};
    `}
  >
    <div className="wrapper">
      <div className="site-navigation-button">
        <span className="top" />
        <span className="middle" />
        <span className="bottom" />
      </div>
      <div className="labels">
        <div className="labels-inner">
          <div className="label-1">Menu</div>
          <div className="label-2">Close</div>
        </div>
      </div>
    </div>
  </div>
);

export default Hamburger;
