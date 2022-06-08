import { createGlobalStyles, useTheme } from "solid-styled-components";

const GlobalStyle = () => {
  const theme = useTheme();
  const Style = createGlobalStyles({
    body: {
      backgroundColor: theme.colors.primary,
    },
  });

  return <Style />;
};

export default GlobalStyle;
