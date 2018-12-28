import React from "react";
import styled from "styled-components";
import MenuItems from "../wordsby/MenuItems";
import Link from "gatsby-plugin-transition-link";

const MainMenu = () => {
  return (
    <Menu>
      <MenuItems slug="main-menu">
        {items => {
          return items.map(({ pathname, active, activeParent, title }) => (
            <Link
              key={pathname}
              to={pathname}
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
