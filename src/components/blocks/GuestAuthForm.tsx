import { createSignal } from "solid-js";
import { useSession } from "../../providers/SessionProvider";
import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";

const GuestAuthForm = () => {
  const [name, setName] = createSignal("");
  const [session, { setSession }] = useSession();

  function handleSubmit(e: any) {
    e.preventDefault();

    setSession({ name: name() });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Name"
        value={name()}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="primary">Sign in as guest</Button>
    </Form>
  );
};

export default GuestAuthForm;
