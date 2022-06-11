import { useRouter } from "@rturnq/solid-router";
import { createSignal } from "solid-js";
import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";

const JoinRoomForm = () => {
  const [id, setId] = createSignal("");
  const router = useRouter();

  function handleSubmit(e: any) {
    e.preventDefault();

    router.push(`/room/${id()}`);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Room ID"
        value={id()}
        onChange={(e) => setId(e.target.value)}
      />
      <Button variant="primary">Join room</Button>
    </Form>
  );
};

export default JoinRoomForm;
