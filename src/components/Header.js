import React from "react";
import { Link } from "gatsby";
import { css } from "emotion";

// Import app components
import "typeface-poppins";
import Menu from "./Menu";
import Logo from "./Logo";
import GridEdges from "./gridEdges";

const styles = css`
  .site-header {
    background-color: white;
    height: 50px;
    margin-bottom: 70px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    position: relative;
    z-index: 1000;

    @media screen and (min-width: 640px) {
      height: 90px;
      margin-bottom: 100px;
    }

    > * {
      display: flex;
      align-items: flex-end;
    }
  }

  .site-branding {
    margin-left: auto;
    margin-right: 0;

    a,
    & {
      height: 100%;
    }

    a {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }
  }
`;

const Header = ({ logo }) => (
  <div className={styles}>
    <header className="site-header">
      <GridEdges>
        <Menu />
        {logo && (
          <div className="site-branding">
            <Link to="/">
              <Logo title={"bare"} />
            </Link>
          </div>
        )}
      </GridEdges>
    </header>
  </div>
);

export default Header;
