import Typography from "../utils/typography";

const typeConfig = {
  bodyFontFamily: ["Poppins", "sans-serif"],
  headerFontFamily: ["Poppins", "sans-serif"],
  bodyWeight: 300,
  headerWeight: 100,
  baseFontSize: "15px",
  baseLineHeight: 1.6,
  scaleRatio: 2,
  blockMarginBottom: 0,
  includeNormalize: false,
  breakpoints: {
    "@media screen and (min-width:800px)": {
      // any valid media query.
      scaleRatio: 2.5 // Override the default scale
    },
    "@media screen and (min-width:1200px)": {
      // any valid media query.
      scaleRatio: 3.5 // Override the default scale
    },
    "@media screen and (min-width:1500px) and (max-height: 900px)": {
      // any valid media query.
      baseFontSize: "17px",
      scaleRatio: 4 // Override the default scale
    },
    "@media screen and (min-width:1500px) and (min-height: 900px), screen and (min-width: 1900px)": {
      // any valid media query.
      scaleRatio: 4.5 // Override the default scale
    }
  }
  // overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
  // })
};

const typographyString = new Typography(typeConfig).toString();

export default typographyString;
