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

const bp = {
  mobile: 576,
  tablet: 768,
  laptop: 992,
  desktop: 1200,
  wide: 1400,
};

export type BpType = typeof bp;

const mq = (Object.keys(bp) as Array<keyof typeof bp>).reduce((acc, key) => {
  acc[key] = `@media (min-width: ${bp[key]}px)`;
  return acc;
}, {} as Record<keyof typeof bp, string>);

export type MqType = typeof mq;

const theme: DefaultTheme = {
  colors,
  fontFamily,
  horizontalPadding,
  bp,
  mq,
};

export default theme;
