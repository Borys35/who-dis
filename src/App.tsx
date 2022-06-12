import { MatchRoute, pathIntegration, Router } from "@rturnq/solid-router";
import { Component, createEffect, Switch } from "solid-js";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicOnlyRoute from "./components/routes/PublicOnlyRoute";
import { supabase } from "./helpers/supabase/supabaseClient";
import { useUser } from "./providers/UserProvider";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Room from "./routes/Room";
import GlobalStyle from "./styles/GlobalStyle";

// Hide at the end (password for postgres database): TU7dbGR4QL6qtRA5

const App: Component = () => {
  const [user, { setSession, setProfile }] = useUser();

  createEffect(async () => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
      receiveProfile(session?.user?.id);
    });

    receiveProfile(supabase.auth.session()?.user?.id);
  });

  async function receiveProfile(id: string | undefined) {
    if (!id) return;

    const { data } = await supabase
      .from("profiles")
      .select()
      .eq("id", supabase.auth.session()?.user?.id);

    if (!data || data.length === 0) return setProfile(null);

    setProfile(data[0]);
  }

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
