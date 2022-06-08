import { MatchRoute, pathIntegration, Router } from "@rturnq/solid-router";
import { Component, Switch } from "solid-js";
import { MetaProvider } from "solid-meta";
import { ThemeProvider } from "solid-styled-components";
import Home from "./routes/Home";
import theme from "./styles/theme";

// Hide at the end (password for postgres database): TU7dbGR4QL6qtRA5

const App: Component = () => {
  return (
    <MetaProvider>
      <ThemeProvider theme={theme}>
        <Router integration={pathIntegration()}>
          <Switch fallback={() => "404"}>
            <MatchRoute end>
              <Home />
            </MatchRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </MetaProvider>
  );
};

export default App;
