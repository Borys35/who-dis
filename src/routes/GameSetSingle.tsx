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
import Modal from "../components/blocks/Modal";
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

type MessageType = "inbox" | "reply";

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
  const [toDelete, setToDelete] = createSignal<{
    type: MessageType;
    i: number;
  } | null>(null);
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

  function handleStartDeletingMessage(type: MessageType, i: number) {
    setToDelete({ type, i });
  }

  async function handleDeleteMessage() {
    if (!toDelete()) return;

    const values: { inboxes?: string[]; replies?: string[] } = {};

    if (toDelete()!.type === "inbox") {
      const messages = [...gameSet()!.inboxes];
      messages.splice(toDelete()!.i, 1);
      values.inboxes = messages;
    } else {
      const messages = [...gameSet()!.replies];
      messages.splice(toDelete()!.i, 1);
      values.replies = messages;
    }

    await supabase
      .from<GameSetType>("sets")
      .update(values)
      .match({ id: props.id });

    setToDelete(null);
  }

  function handleCancelDeletingMessage() {
    setToDelete(null);
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
        <Modal open={!!toDelete()}>
          <h5 class={css({ marginBottom: "1rem" })}>Want to delete?</h5>
          <p class={css({ marginBottom: "2rem" })}>
            Are you sure you want to delete "
            {toDelete()!.type === "inbox"
              ? gameSet()!.inboxes[toDelete()!.i]
              : gameSet()!.replies[toDelete()!.i]}
            " from {toDelete()!.type === "inbox" ? "Inboxes" : "Replies"}?
          </p>
          <div
            class={css({
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            })}
          >
            <Button onClick={handleCancelDeletingMessage}>Cancel</Button>
            <Button variant="primary" onClick={handleDeleteMessage}>
              Delete
            </Button>
          </div>
        </Modal>
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
                {(inbox, i) => (
                  <Inbox
                    message={inbox}
                    clickable={true}
                    onClick={() => handleStartDeletingMessage("inbox", i())}
                  />
                )}
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
                {(reply, i) => (
                  <Reply
                    message={reply}
                    selected={true}
                    clickable={true}
                    onClick={() => handleStartDeletingMessage("reply", i())}
                  />
                )}
              </For>
            </StyledMessageGrid>
          </div>
        </StyledForms>
      </Show>
    </Layout>
  );
};

export default GameSetSingle;
