import { DefaultTheme } from "solid-styled-components";

const colors = {
  primary: "#5000D2",
  white: "#FFF",
  black: "#000",
  grey: "#686868",
  background: "#F4F4F4",
  message: "#006DD2",
};

const fontFamily = "'Montserrat', sans-serif";

const horizontalPadding = "clamp(1rem, 5vw, 5rem)";

const theme: DefaultTheme = {
  colors,
  fontFamily,
  horizontalPadding,
};

export default theme;
