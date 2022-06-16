import { createSignal, Show } from "solid-js";
import { css, styled } from "solid-styled-components";
import PlayersList from "../components/blocks/PlayersList";
import Button from "../components/common/Button";
import Subtext from "../components/common/Subtext";
import MessageGrid from "../components/game/MessageGrid";
import Phone from "../components/game/Phone";
import Reply from "../components/game/Reply";
import Layout from "../components/global/Layout";
import { useUser } from "../providers/UserProvider";

const StyledContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "3fr 5fr 2fr",
  gridTemplateRows: "4fr 1fr",
  gap: "2rem",
  marginTop: "2rem",
});

const StyledSubtext = styled(Subtext)({
  display: "block",
  marginBottom: "1rem",
});

const Game = () => {
  const [selectedMessage, setSelectedMessage] = createSignal<string | null>(
    null
  );
  const [pickedMessage, setPickedMessage] = createSignal<string | null>(null);
  const [user] = useUser();
  const pickerId = "e4622b36-638a-458b-b0cf-2300175bbed3?";
  const isPicker = () => user.profile?.id === pickerId;

  // Submits selected message and sends it to database
  async function handleSelectMessage(message: string) {
    if (!selectedMessage || isPicker()) return;

    setSelectedMessage(message);
  }

  // Submits selected message and sends it to database
  async function handleSubmitMessage() {
    if (!selectedMessage || isPicker()) return;
  }

  // Picks message from given replies
  async function handlePickMessage(message: string) {
    if (!isPicker()) return;

    setPickedMessage(message);
  }

  // Submits picked message as a victorious reply
  async function handleSubmitPickedMessage() {
    if (!pickedMessage || !isPicker()) return;
  }

  return (
    <Layout pageTitle="Game">
      <StyledContainer>
        <div>
          <Phone
            messages={[
              { type: "inbox", content: "Bla blah" },
              { type: "reply", content: "Blah" },
            ]}
          />
        </div>
        <div>
          <StyledSubtext>Replies</StyledSubtext>
          <MessageGrid>
            <Reply
              message="Hi"
              clickable={isPicker() && pickedMessage() !== "Hi"}
              selected={pickedMessage() === "Hi"}
              onClick={() => handlePickMessage("Hi")}
            />
          </MessageGrid>
          <Show when={isPicker()}>
            <div
              class={css({
                marginTop: "1.5rem",
              })}
            >
              <Button
                disabled={!isPicker() || pickedMessage() === null}
                onClick={handleSubmitPickedMessage}
              >
                Submit
              </Button>
            </div>
          </Show>
        </div>
        <div>
          <StyledSubtext>Players</StyledSubtext>
          <PlayersList
            players={[{ id: "", name: "sdsds", points: 2 }]}
            showPoints={true}
          />
        </div>
        <div
          class={css({
            gridColumn: "1 / 4",
          })}
        >
          <StyledSubtext>Your hand</StyledSubtext>
          <div class={css({ display: "flex", gap: "2rem" })}>
            <div
              class={css({
                flex: "1",
              })}
            >
              <MessageGrid>
                <Reply
                  message="Hi"
                  clickable={!isPicker() && selectedMessage() !== "Hi"}
                  onClick={() => handleSelectMessage("Hi")}
                  selected={selectedMessage() === "Hi"}
                />
              </MessageGrid>
            </div>
            <Show when={!isPicker()}>
              <div>
                <Button
                  variant="secondary"
                  disabled={selectedMessage() === null}
                  onClick={handleSubmitMessage}
                >
                  Submit
                </Button>
              </div>
            </Show>
          </div>
        </div>
      </StyledContainer>
    </Layout>
  );
};

export default Game;
