import { createSignal } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../providers/UserProvider";
import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";

const GuestAuthForm = () => {
  const [name, setName] = createSignal("");
  const [user, { setProfile }] = useUser();

  function handleSubmit(e: any) {
    e.preventDefault();

    setProfile({ id: uuidv4(), username: name() });
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
