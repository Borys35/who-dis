import { useRouter } from "@rturnq/solid-router";
import { Component, createSignal, For, onMount, Show } from "solid-js";
import { css, styled, useTheme } from "solid-styled-components";
import PlayersList from "../components/blocks/PlayersList";
import Button from "../components/common/Button";
import Subtext from "../components/common/Subtext";
import MessageGrid from "../components/game/MessageGrid";
import Phone from "../components/game/Phone";
import Reply from "../components/game/Reply";
import Layout from "../components/global/Layout";
import { supabase } from "../helpers/supabase/supabaseClient";
import { useUser } from "../providers/UserProvider";
import { GameType } from "../typings";

interface Props {
  id: string;
}

const StyledContainer = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "2rem",
  margin: "2rem 0 4rem 0",

  [theme!.mq.desktop]: {
    gridTemplateColumns: "3fr 5fr 2fr",
  },
}));

const StyledSubtext = styled(Subtext)({
  display: "block",
  marginBottom: "1rem",
});

const Game: Component<Props> = (props) => {
  const [game, setGame] = createSignal<GameType | null>(null);
  const [selectedMessage, setSelectedMessage] = createSignal<string | null>(
    null
  );
  const [pickedMessage, setPickedMessage] = createSignal<string | null>(null);
  const [user] = useUser();
  const router = useRouter();
  const theme = useTheme();
  const pickerId = "e4622b36-638a-458b-b0cf-2300175bbed3?";
  const isPicker = () => user.profile?.id === pickerId;
  const repliesOnHand = () => {
    return game()?.player_hands.find((hand) => hand.id === user.profile?.id)
      ?.replies;
  };

  // Submits selected message and sends it to database
  async function handleSelectMessage(message: string) {
    if (!selectedMessage || isPicker()) return;

    setSelectedMessage(message);
  }

  // Submits selected message and sends it to database
  async function handleSubmitMessage() {
    if (!selectedMessage || isPicker()) return;

    // Add selected_reply to player_hand
    // Set is_picker to player_hand

    // await supabase.from<GameType>('games').update({

    // })
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

  onMount(async () => {
    try {
      // Get game
      const { data, error } = await supabase
        .from<GameType>("games")
        .select(
          `
          *,
          room:room_id(*),
          set:set_id(*)
        `
        )
        .eq("id", props.id);

      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Game not found");

      const gameData = data[0];
      console.log(gameData);
      setGame(gameData);
    } catch (e: any) {
      alert(e.message);
      router.replace("/");
    }
  });

  return (
    <Layout pageTitle="Game">
      <Show when={!!game()} fallback={() => <div>Loading</div>}>
        <StyledContainer>
          <div
            class={css({
              maxWidth: "300px",
            })}
          >
            <Phone
              messages={[{ type: "inbox", content: game()!.current_inbox }]}
            />
          </div>
          <div>
            <StyledSubtext>Replies</StyledSubtext>
            <MessageGrid>
              {/* <Reply
                message="Hi"
                clickable={isPicker() && pickedMessage() !== "Hi"}
                selected={pickedMessage() === "Hi"}
                onClick={() => handlePickMessage("Hi")}
              /> */}
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
            <PlayersList players={game()!.room.players} showPoints={true} />
          </div>
          <div
            class={css({
              [theme.mq.desktop]: {
                gridColumn: "1 / 4",
              },
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
                  <Show when={!!repliesOnHand()}>
                    <For each={repliesOnHand()}>
                      {(reply) => (
                        <Reply
                          message={reply}
                          clickable={!isPicker() && selectedMessage() !== reply}
                          onClick={() => handleSelectMessage(reply)}
                          selected={selectedMessage() === reply}
                        />
                      )}
                    </For>
                  </Show>
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
      </Show>
    </Layout>
  );
};

export default Game;
