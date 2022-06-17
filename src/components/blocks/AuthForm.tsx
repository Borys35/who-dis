import { createSignal, Match, Switch } from "solid-js";
import { css } from "solid-styled-components";
import { supabase } from "../../helpers/supabase/supabaseClient";
import { useUser } from "../../providers/UserProvider";
import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";
import Modal from "./Modal";

const AuthForm = () => {
  const [id, setId] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [proceeding, setProceeding] = createSignal(false);
  const [creating, setCreating] = createSignal<boolean | null>(null);
  const [user] = useUser();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setProceeding(true);

      const { error } = await supabase.auth.signIn(
        {
          email: email(),
        },
        { redirectTo: `${location.origin}/` }
      );
      if (error) throw error;

      // Add username to profile in database if it doesn't exist
      const { data, error: profileError } = await supabase
        .from("profiles")
        .select()
        .eq("email", email());

      if (profileError) throw profileError;
      if (data.length === 0) throw new Error("Profile not found");

      if (data[0].username === null) setCreating(true);
      else setCreating(false);

      // alert("Check your e-mail for the login link.");
    } catch (e: any) {
      alert(e.error_description || e.message);
    }
  }

  async function handleCreate(e: any) {
    e.preventDefault();

    setCreating(false);

    await supabase
      .from("profiles")
      .update({
        username: username(),
      })
      .match({ email: email() });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          label="E-mail"
          type="email"
          value={email()}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <Input
        label="Name"
        value={name()}
        onChange={(e) => setName(e.target.value)}
      /> */}
        <Button variant="primary" disabled={proceeding()}>
          Sign in
        </Button>
      </Form>
      <Modal open={proceeding() && typeof creating() === "boolean"}>
        <Switch>
          <Match when={proceeding() && creating()}>
            <h6
              class={css({
                marginBottom: "3rem",
              })}
            >
              Just one more step
            </h6>
            <Form onSubmit={handleCreate}>
              <Input
                label="Username"
                value={username()}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button variant="primary">Submit</Button>
            </Form>
          </Match>
          <Match when={proceeding() && creating() === false}>
            <h6
              class={css({
                marginBottom: "3rem",
              })}
            >
              Check your e-mail for the login link.
            </h6>
            <p>You can close this window.</p>
          </Match>
        </Switch>
      </Modal>
    </>
  );
};

export default AuthForm;
