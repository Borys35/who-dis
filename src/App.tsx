import { MatchRoute, pathIntegration, Router } from "@rturnq/solid-router";
import { Component, createEffect, Switch } from "solid-js";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicOnlyRoute from "./components/routes/PublicOnlyRoute";
import { supabase } from "./helpers/supabase/supabaseClient";
import { useSession } from "./providers/SessionProvider";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Room from "./routes/Room";
import GlobalStyle from "./styles/GlobalStyle";

// Hide at the end (password for postgres database): TU7dbGR4QL6qtRA5

const App: Component = () => {
  const [session, { setSession }] = useSession();

  createEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
    });
  });

  return (
    <>
      <Router integration={pathIntegration()}>
        <Switch fallback={() => "404"}>
          <MatchRoute end>
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          </MatchRoute>
          <MatchRoute path="login">
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          </MatchRoute>
          <MatchRoute path="room/:id">
            {(route) => (
              <PrivateRoute>
                <Room id={route.params.id} />
              </PrivateRoute>
            )}
          </MatchRoute>
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  );
};

export default App;
