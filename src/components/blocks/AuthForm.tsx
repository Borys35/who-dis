import { createSignal } from "solid-js";
import { supabase } from "../../helpers/supabase/supabaseClient";
import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";

const AuthForm = () => {
  const [email, setEmail] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn(
        { email: email() },
        { redirectTo: "/" }
      );
      if (error) throw error;
      alert("Check your e-mail for the login link.");
    } catch (e: any) {
      alert(e.error_description || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
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
      <Button variant="primary" disabled={loading()}>
        Sign in
      </Button>
    </Form>
  );
};

export default AuthForm;
