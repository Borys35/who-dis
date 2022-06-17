import { useRouter } from "@rturnq/solid-router";
import {
  Component,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { css, styled } from "solid-styled-components";
import Button from "../components/common/Button";
import Form from "../components/common/Form";
import Input from "../components/common/Input";
import Inbox from "../components/game/Inbox";
import MessageGrid from "../components/game/MessageGrid";
import Reply from "../components/game/Reply";
import Layout from "../components/global/Layout";
import { supabase } from "../helpers/supabase/supabaseClient";
import { GameSetType } from "../typings";

interface Props {
  id: string;
}

const StyledForms = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2rem",
});

const StyledMessageGrid = styled(MessageGrid)({
  marginTop: "3rem",
  maxHeight: "400px",
  overflowY: "auto",
});

const GameSetSingle: Component<Props> = (props) => {
  const [gameSet, setGameSet] = createSignal<GameSetType | null>(null);
  const [inbox, setInbox] = createSignal<string>("");
  const [reply, setReply] = createSignal<string>("");
  const router = useRouter();

  async function handleAddInbox(e: any) {
    e.preventDefault();

    if (!inbox()) return;

    await supabase
      .from("sets")
      .update({ inboxes: [...gameSet()!.inboxes, inbox()] })
      .match({ id: props.id });

    setInbox("");
  }

  async function handleAddReply(e: any) {
    e.preventDefault();

    console.log(reply());
    if (!reply()) return;

    await supabase
      .from("sets")
      .update({ replies: [...gameSet()!.replies, reply()] })
      .match({ id: props.id });

    setReply("");
  }

  onMount(async () => {
    try {
      const { data, error } = await supabase
        .from<GameSetType>("sets")
        .select()
        .eq("id", props.id);

      if (error) throw error;
      if (!data || data.length === 0) throw new Error("No game set found");

      supabase
        .from<GameSetType>("sets")
        .on("UPDATE", (payload) => {
          setGameSet(payload.new);
        })
        .subscribe();

      setGameSet(data[0]);
    } catch (e: any) {
      alert(e.message);
      router.replace("/game-set");
    }
  });

  onCleanup(() => {
    supabase.removeAllSubscriptions();
  });

  return (
    <Layout pageTitle="Choose game set">
      <Show when={gameSet()} fallback={() => <div>Loading</div>}>
        <h1
          class={css({
            margin: "4rem 0 2rem 0",
          })}
        >
          Game set
        </h1>
        <p
          class={css({
            marginBottom: "4rem",
          })}
        >
          Chosen game set: <strong>{gameSet()!.name}</strong>
        </p>
        <StyledForms>
          <div>
            <Form onSubmit={handleAddInbox}>
              <Input
                label="Inbox"
                value={inbox()}
                onChange={(e) => setInbox(e.target.value)}
              />
              <Button variant="primary">Add inbox</Button>
            </Form>
            <StyledMessageGrid>
              <For each={gameSet()!.inboxes}>
                {(inbox) => <Inbox message={inbox} />}
              </For>
            </StyledMessageGrid>
          </div>
          <div>
            <Form onSubmit={handleAddReply}>
              <Input
                label="Reply"
                value={reply()}
                onChange={(e) => setReply(e.target.value)}
              />
              <Button variant="primary">Add reply</Button>
            </Form>
            <StyledMessageGrid>
              <For each={gameSet()!.replies}>
                {(reply) => <Reply message={reply} selected={true} />}
              </For>
            </StyledMessageGrid>
          </div>
        </StyledForms>
      </Show>
    </Layout>
  );
};

export default GameSetSingle;
