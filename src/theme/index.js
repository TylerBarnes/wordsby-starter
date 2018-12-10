import Typography from "tyjs";
import { minWidth, maxWidth } from "../utils/breakpointHelpers";

export const theme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 800,
    lg: 992,
    xl: 1200
  },
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "1rem",
    4: "1.5rem",
    5: "3rem"
  },
  color: {
    grey: "#58595B",
    greyLight: "#D6D6D6",
    yellow: "#FFFF00",
    lightBlue: "#00ADEE"
  },
  minWidth: minWidth,
  maxWidth: maxWidth
};

const typeConfig = {
  bodyFontFamily: ["Montserrat", "sans-serif"],
  headerFontFamily: ["Montserrat", "sans-serif"],
  bodyWeight: 400,
  headerWeight: 500,
  baseFontSize: "19px",
  baseLineHeight: 1.6,
  scaleRatio: 1.8,
  blockMarginBottom: 1,
  includeNormalize: false,
  breakpoints: {
    [`@media screen and (min-width: ${theme.breakpoints.sm}px)`]: {
      scaleRatio: 2
    },
    [`@media screen and (min-width:${theme.breakpoints.md}px)`]: {
      baseFontSize: "20px",
      scaleRatio: 2
    }
  },
  overrideStyles: ({ rhythm }) => ({
    h1: {
      letterSpacing: "-1px"
    },
    "p + h1, p + h2, p + h3, p + h4, p + h5, p + h6, ul + h1, ul + h2, ul + h3, ul + h4, ul + h5, ul + h6, ol + h1, ol + h2, ol + h3, ol + h4, ol + h5, ol + h6": {
      marginTop: rhythm(2.5)
    },
    ".gatsby-highlight + h2, .gatsby-highlight + h1, .gatsby-highlight + h3, .gatsby-highlight + h4, .gatsby-highlight + h5, .gatsby-highlight + h6, pre + h2, pre + h1, pre + h3, pre + h4, pre + h5, pre + h6, pre + p": {
      marginTop: rhythm(1.5)
    },
    ".gatsby-highlight + p": {
      marginTop: rhythm(1.5)
    },
    "p + .gatsby-highlight": {
      marginTop: rhythm(-0.5)
    },
    "p:last-child": {
      marginBottom: rhythm(2)
    },
    p: {
      maxWidth: "600px"
      // margin: '0 auto',
    },
    "ul + p, ol + p": {
      marginTop: rhythm(1.5)
    },
    ".super-title": {
      fontWeight: 100,
      letterSpacing: 0,
      textTransform: "uppercase",
      display: "inline-block"
    },
    [theme.minWidth("sm")]: {
      ".super-title": {
        fontSize: rhythm(1.5)
      }
    },
    [theme.minWidth("md")]: {
      ".super-title": {
        fontSize: rhythm(2)
      }
    },
    [theme.minWidth("lg")]: {
      ".super-title": {
        fontSize: rhythm(3),
        paddingBottom: rhythm(1),
        marginBottom: rhythm(2)
      }
    }
  })
};

const typography = new Typography(typeConfig);
const Rhythm = typography.rhythm;
const typographyString = typography.toString();

export { Rhythm, typographyString };
