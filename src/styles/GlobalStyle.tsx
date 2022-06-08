import { createGlobalStyles, useTheme } from "solid-styled-components";

const GlobalStyle = () => {
  const theme = useTheme();
  const Style = createGlobalStyles({
    "*, *::before, *::after": {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
    },
    body: {
      backgroundColor: theme.colors.background,
      color: theme.colors.black,
      fontFamily: theme.fontFamily,
      margin: "0",
      padding: `0 ${theme.horizontalPadding}`,
    },
    h1: {
      fontSize: "4rem",
    },
    h2: {
      fontSize: "3.5rem",
    },
    h3: {
      fontSize: "3rem",
    },
    h4: {
      fontSize: "2.5rem",
    },
    h5: {
      fontSize: "2rem",
    },
    h6: {
      fontSize: "1.5rem",
    },
  });

  return <Style />;
};

export default GlobalStyle;
