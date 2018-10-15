import React from "react";
import { Link } from "gatsby";
import { css } from "emotion";

// Import app components
import Logo from "./Logo";
import GridEdges from "./gridEdges";
import Color from "./Color";

const styles = css`
  .footer {
    background-color: white;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    position: relative;
    z-index: 100;
    padding-top: 50px;
  }

  .site-branding {
    margin: 0 auto;

    @media screen and (min-width: 768px) {
      justify-content: flex-end;
      margin-left: auto;
      margin-right: 0;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: flex-end;

      @media screen and (min-width: 768px) {
        justify-content: flex-end;
      }
    }
  }

  .content {
    width: 100%;
    text-align: center;

    @media screen and (min-width: 768px) {
      width: auto;
      text-align: left;
      flex: 1;
    }

    @media screen and (min-width: 1024px) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .text {
    color: ${Color.lightGrey};
    text-align: center;
    margin-bottom: 20px;

    @media screen and (min-width: 768px) {
      padding: 10px 0;
      text-align: left;
      margin-bottom: 0;
    }
  }

  .email,
  .tel {
    color: ${Color.lightGrey};
    text-decoration: none;
    display: block;
    margin-bottom: 12px;

    @media screen and (min-width: 768px) {
      display: inline-block;
      margin-right: 15px;
      margin-bottom: 0;
    }

    @media screen and (min-width: 1024px) {
      padding: 10px 0;
    }

    @media screen and (min-width: 1280px) {
      margin-right: 30px;
    }
  }

  .email {
    color: ${Color.red};
  }
`;

const Footer = ({ logo }) => (
  <div className={styles}>
    <GridEdges>
      <footer className="footer">
        <div className="content">
          <a className="email" href="mailto:info@bare.ca">
            info@bare.ca
          </a>
          <a className="tel" href="tel:604.681.2273">
            604.681.2273
          </a>
          <p className="text">
            205-440 Cambie Street, Vancouver, British Columbia, Canada V6B 2N5
          </p>
        </div>

        {logo && (
          <div className="site-branding">
            <Link to="/">
              <Logo title={"bare"} />
            </Link>
          </div>
        )}
      </footer>
    </GridEdges>
  </div>
);

export default Footer;
