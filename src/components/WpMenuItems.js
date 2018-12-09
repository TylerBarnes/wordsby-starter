import React, { Fragment } from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styled from "react-emotion";

const MenuContainerStyles = styled.div`
  .nestedMenuLinks {
    display: none;
  }
`;

const MenuContainer = ({ items }) => {
  return (
    items && (
      <MenuContainerStyles>
        {items.map(link => (
          <MenuLinkContainer
            key={`menuItem-${link.wordpress_id}`}
            link={link}
          />
        ))}
      </MenuContainerStyles>
    )
  );
};

const MenuLinkContainer = ({ link }) => {
  const { wordpress_children: nestedLinks } = link;

  return (
    <div className="MenuLinkContainer">
      <MenuLink link={link} />
      {nestedLinks && <NestedMenuLinks links={nestedLinks} />}
    </div>
  );
};

const MenuLink = ({ link }) => {
  return link.url !== "#" ? (
    <Link
      to={link.url}
      onClick={() => this.toggleMenu()}
      activeClassName="active"
      className="MenuLink"
    >
      {link.title}
    </Link>
  ) : (
    <div onClick={() => this.toggleMenu()} className="MenuLink">
      {link.title}
    </div>
  );
};

const NestedMenuLinks = ({ links }) => {
  return links ? (
    <div className="nestedMenuLinks">
      {links.map(link => (
        <MenuLink key={`nestedMenuLink-${link.wordpress_id}`} link={link} />
      ))}
    </div>
  ) : null;
};

// Insert if at least one menu item has children
// It throws error if not!
//
// wordpress_children {
//   title
//   url
//   wordpress_id
// }

export default ({ slug: propSlug }) => {
  return (
    <Fragment>
      {propSlug ? (
        <StaticQuery
          query={graphql`
            {
              allWordpressWpApiMenusMenusItems {
                edges {
                  node {
                    slug
                    items {
                      title
                      url
                      wordpress_id
                    }
                  }
                }
              }
            }
          `}
          render={({ allWordpressWpApiMenusMenusItems: wpmenu }) => {
            const menu = wpmenu.edges.filter(
              ({ node }) => node.slug === propSlug
            );

            const items = menu.length > 0 ? menu[0].node.items : false;
            // return null;
            return items ? (
              <MenuContainer items={items} />
            ) : (
              <h2>
                {propSlug} doesn't return anything. Maybe you have a spelling
                error?
              </h2>
            );
          }}
        />
      ) : (
        <h2>Add a WP menu slug to return menu items.</h2>
      )}
    </Fragment>
  );
};
