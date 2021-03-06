/* @refresh reload */
import { render } from "solid-js/web";
import { MetaProvider } from "solid-meta";
import { ThemeProvider } from "solid-styled-components";
import App from "./App";
import UserProvider from "./providers/UserProvider";
import theme from "./styles/theme";

render(
  () => (
    <MetaProvider>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </MetaProvider>
  ),
  document.getElementById("root") as HTMLElement
);
