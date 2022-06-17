import { Link } from "@rturnq/solid-router";
import { Show } from "solid-js";
import { css, styled } from "solid-styled-components";
import { supabase } from "../../helpers/supabase/supabaseClient";
import { useUser } from "../../providers/UserProvider";

const StyledNav = styled.nav(({ theme }) => ({
  padding: "1rem 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "0.5rem",

  [theme!.mq.tablet]: {
    flexDirection: "row",
    alignItems: "center",
  },
}));

const LinkClass = css({
  cursor: "pointer",
});

const Navbar = () => {
  const [user, { setProfile }] = useUser();

  function handleSignOut() {
    supabase.auth.signOut();
    setProfile(null);
  }

  return (
    <StyledNav>
      <h5>
        <Link href="/">Who dis?</Link>
      </h5>
      <div
        class={css({
          display: "flex",
          gap: "2rem",
        })}
      >
        <Show when={user.profile}>
          <Link href="/game-set">Game sets</Link>
          <span
            class={LinkClass}
            onClick={() => {
              handleSignOut();
            }}
          >
            Sign out
          </span>
        </Show>
      </div>
    </StyledNav>
  );
};

export default Navbar;
