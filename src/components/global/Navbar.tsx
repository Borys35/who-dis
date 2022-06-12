import { Show } from "solid-js";
import { css, styled } from "solid-styled-components";
import { supabase } from "../../helpers/supabase/supabaseClient";
import { useUser } from "../../providers/UserProvider";

const StyledNav = styled.nav({
  padding: "1rem 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const LinkClass = css({
  cursor: "pointer",
});

const Navbar = () => {
  const [user] = useUser();

  function handleSignOut() {
    supabase.auth.signOut();
  }

  return (
    <StyledNav>
      <h5>Who dis?</h5>
      <div>
        <Show when={user.profile}>
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
