import React from "react";
import styled from "styled-components";
import MenuItems from "../wordsby/MenuItems";
import Link from "gatsby-plugin-transition-link";

const MainMenu = () => {
  return (
    <Menu>
      <MenuItems slug="main-menu">
        {items => {
          return items.map(({ url, active, activeParent, title }) => (
            <Link
              key={url}
              to={url}
              className={active || activeParent ? "active" : ""}
            >
              {title}
            </Link>
          ));
        }}
      </MenuItems>
    </Menu>
  );
};

export default MainMenu;

const Menu = styled.nav``;
