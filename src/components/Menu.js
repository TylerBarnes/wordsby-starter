import React from "react";
import { css } from "emotion";
import WpMenuItems from "./WpMenuItems";

// import app components
import Color from "./Color";
import Hamburger from "./Hamburger";

const menuStyles = css`
  .menu-wrapper {
    padding: 150px 30px 30px;
    opacity: 0;
    transition: 1s all;
    pointer-events: none;
    background: ${Color.red};
    height: 100vh;
    width: 100%;
    max-width: 400px;
    position: fixed;
    z-index: 100;
    top: 0;
    left: -100%;
  }

  .clickAwayListener {
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background: rgba(0, 0, 0, 0.8); */
  }

  .menu-inner {
    width: 100%;
    display: flex;
    transition: 1s all;
    display: flex;
    justify-content: flex-end;

    @media screen and (min-width: 640px) {
      text-align: right;
    }

    .MenuLinkContainer {
      transform: translateY(60px);
      transition: 0.5s all;
    }

    a {
      position: relative;
      display: block;
      padding: 12px 0;
      margin-bottom: 4px;
      font-size: 36px;
      line-height: 46px;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 100;
      text-decoration: none;
      text-transform: lowercase;

      &:before {
        content: " ";
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        background: ${Color.red};
        transition: ease all 0.2s;
        pointer-events: none;
      }

      &:hover {
        &:before {
          height: 32px;
        }
      }
      &.active {
        color: white;

        &:before {
          height: 0;
        }
      }
    }
  }
`;

const openStyles = css`
  .menu-wrapper {
    pointer-events: all;
    opacity: 0.98;
    transition: 0.5s all;
    left: 0;
  }
  .menu-inner {
    .MenuLinkContainer {
      transform: translateY(0);
      transition: 0.5s all;

      &:nth-child(1) {
        transition-delay: 0.3s;
      }
      &:nth-child(2) {
        transition-delay: 0.35s;
      }
      &:nth-child(3) {
        transition-delay: 0.4s;
      }
      &:nth-child(4) {
        transition-delay: 0.45s;
      }
      &:nth-child(5) {
        transition-delay: 0.5s;
      }
      &:nth-child(6) {
        transition-delay: 0.55s;
      }
    }
  }
`;

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }));
  };

  render() {
    return (
      <div
        className={css`
          ${menuStyles} ${this.state.menuOpen && openStyles};
        `}
      >
        <div onClick={() => this.toggleMenu()}>
          <Hamburger menuOpen={this.state.menuOpen} />
        </div>

        <section className="menu-wrapper">
          <div className="menu-inner">
            <WpMenuItems slug="main-menu" />
          </div>
        </section>
        {this.state.menuOpen && (
          <div
            onClick={() => this.toggleMenu()}
            className="clickAwayListener"
          />
        )}
      </div>
    );
  }
}

export default Menu;
