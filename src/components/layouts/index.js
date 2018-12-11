import React from "react";
import Helmet from "react-helmet";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import "minireset.css";
import { theme, typographyString } from "../../theme";
import MainMenu from "../menus/MainMenu";

const GlobalStyle = createGlobalStyle`
  ${typographyString}
`;

export default class MainLayout extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <Helmet>
            <meta name="description" />
          </Helmet>

          <GlobalStyle />

          <MainMenu />

          {this.props.children}
        </>
      </ThemeProvider>
    );
  }
}
