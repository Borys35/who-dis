import { DefaultTheme } from "solid-styled-components";

const colors = {
  primary: "#006DD2",
  white: "#FFF",
  black: "#000",
  grey: "#686868",
  background: "#F4F4F4",
};

const fontFamily = "'Montserrat', sans-serif";

const horizontalPadding = "clamp(1rem, 5vw, 5rem)";

const theme: DefaultTheme = {
  colors,
  fontFamily,
  horizontalPadding,
};

export default theme;
