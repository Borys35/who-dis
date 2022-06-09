/* @refresh reload */
import { render } from "solid-js/web";
import { MetaProvider } from "solid-meta";
import { ThemeProvider } from "solid-styled-components";
import App from "./App";
import SessionProvider from "./providers/SessionProvider";
import theme from "./styles/theme";

render(
  () => (
    <MetaProvider>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <App />
        </SessionProvider>
      </ThemeProvider>
    </MetaProvider>
  ),
  document.getElementById("root") as HTMLElement
);
