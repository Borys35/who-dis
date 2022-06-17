import { useRouter } from "@rturnq/solid-router";
import { createSignal } from "solid-js";
import { css } from "solid-styled-components";
import Button from "../components/common/Button";
import Form from "../components/common/Form";
import Input from "../components/common/Input";
import Layout from "../components/global/Layout";

const GameSet = () => {
  const [id, setId] = createSignal("");
  const router = useRouter();

  function handleSubmit(e: any) {
    e.preventDefault();

    if (!id()) return;

    router.push(`/game-set/${id()}`);
  }

  return (
    <Layout pageTitle="Choose game set">
      <h1
        class={css({
          margin: "4rem 0",
        })}
      >
        Choose game set
      </h1>
      <Form onSubmit={handleSubmit}>
        <Input
          label="Game set ID"
          value={id()}
          onChange={(e) => setId(e.target.value)}
        />
        <Button variant="primary">Choose</Button>
      </Form>
    </Layout>
  );
};

export default GameSet;
