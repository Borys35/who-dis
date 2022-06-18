import { useRouter } from "@rturnq/solid-router";
import {
  Component,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { createStore } from "solid-js/store";
import { css, styled, useTheme } from "solid-styled-components";
import OptionsList from "../components/blocks/OptionsList";
import PlayersList from "../components/blocks/PlayersList";
import Button from "../components/common/Button";
import Select from "../components/common/Select";
import Subtext from "../components/common/Subtext";
import Layout from "../components/global/Layout";
import { supabase } from "../helpers/supabase/supabaseClient";
import { useUser } from "../providers/UserProvider";
import {
  GameSetType,
  GameType,
  PlayerHandType,
  PlayerType,
  RoomType,
} from "../typings";

interface Props {
  id: string;
}

const StyledList = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  alignItems: "flex-start",
});

const Room: Component<Props> = (props) => {
  const [room, setRoom] = createStore<RoomType>({} as RoomType);
  const [sets, setSets] = createSignal<Pick<GameSetType, "id" | "name">[]>([]);
  const router = useRouter();
  const [user] = useUser();
  const theme = useTheme();
  // const userId = () => {
  //   const sess = user;
  //   if (sess === null) return;

  //   if (isGuest(sess)) return (sess as GuestSession).id;

  //   return (sess as Session).user?.id;
  // };

  onMount(async () => {
    try {
      // Listen to room options changes
      supabase
        .from<RoomType>("rooms")
        .on("UPDATE", (payload) => {
          setRoom(payload.new);
        })
        .subscribe();

      // Get room
      const { data, error } = await supabase
        .from<RoomType>("rooms")
        .select()
        .eq("id", props.id);

      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Room not found");

      const roomData = data[0];
      if (roomData.players.length >= roomData.max_players)
        throw new Error("Too much players");

      setRoom(roomData);

      const playerToAdd: PlayerType = {
        id: user.profile?.id || "",
        name: user.profile?.username || "",
        points: 0,
        replies: [],
      };
      await supabase
        .from<RoomType>("rooms")
        .update({
          players: [...roomData.players, playerToAdd],
        })
        .match({ id: room.id });

      // Get sets
      const { data: setsData, error: setsError } = await supabase
        .from<GameSetType>("sets")
        .select("id, name");

      if (setsError) throw setsError;
      if (!setsData || setsData.length === 0) throw new Error("No sets found");

      setSets(setsData);

      // Listen to game creation
      supabase
        .from<GameType>("games")
        .on("INSERT", (payload) => {
          // If different game has been created, return.
          if (payload.new.room_id !== room.id) return;

          // Redirect to game
          router.replace(`/game/${payload.new.id}`);
        })
        .subscribe();
    } catch (e: any) {
      alert(e.message);
      router.replace("/");
    }
  });

  onCleanup(() => {
    supabase.removeAllSubscriptions();
  });

  async function updateRoom(values: Partial<RoomType>) {
    // const { data, error } =
    await supabase
      .from<RoomType>("rooms")
      .update(values)
      .match({ id: room.id });
  }

  async function handleCreateGame() {
    function getRandomItems<T>(items: T[], count: number): T[] {
      const result: T[] = [];
      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * items.length);
        const item = items[index];
        items.splice(index, 1);
        result.push(item);
      }
      return result;
    }

    try {
      const { data: gameSetData, error: gameSetError } = await supabase
        .from("rooms")
        .select(
          `
        set:set_id(*)
      `
        )
        .eq("id", room.id);

      if (gameSetError) throw gameSetError;

      const currentSet: GameSetType = { ...gameSetData[0].set };

      const [current_inbox] = currentSet.inboxes.splice(
        Math.floor(Math.random() * currentSet.inboxes.length),
        1
      );

      const player_hands: PlayerHandType[] = [];
      for (const player of room.players) {
        player_hands.push({
          id: player.id,
          replies: getRandomItems(currentSet.replies, 5),
        });
      }

      const { data, error } = await supabase.from<GameType>("games").insert({
        picker_id: room.players[0].id,
        room_id: room.id,
        set_id: room.set_id,
        remaining_inboxes: currentSet.inboxes,
        remaining_replies: currentSet.replies,
        player_hands,
        current_inbox,
      });

      if (error) throw error;
    } catch (e: any) {
      alert(e.message);
    }
  }

  return (
    <Layout pageTitle="Creating room">
      <div
        class={css({
          margin: "4rem 0",
        })}
      >
        <h1
          class={css({
            marginBottom: "4rem",
          })}
        >
          Game room
        </h1>

        <div
          class={css({
            display: "flex",
            flexDirection: "column",
            gap: "6rem",

            [theme.mq.tablet]: {
              flexDirection: "row",
            },
          })}
        >
          <Show when={room.id}>
            <StyledList>
              <Subtext>
                Players ({room.players.length}/{room.max_players})
              </Subtext>
              <PlayersList showPoints={false} players={room.players} />
            </StyledList>
            <StyledList>
              <Subtext>Options</Subtext>
              <OptionsList
                isHost={user.profile?.id === room.host_id}
                options={[
                  {
                    name: "Round time",
                    value: `${room.round_time}s`,
                    component: (
                      <Select
                        value={room.round_time}
                        onChange={(e: any) =>
                          updateRoom({ round_time: e.target.value })
                        }
                      >
                        <option value={15}>15s</option>
                        <option value={30}>30s</option>
                        <option value={60}>60s</option>
                      </Select>
                    ),
                  },
                  {
                    name: "Points to win",
                    value: room.points_to_win.toString(),
                    component: (
                      <Select
                        value={room.points_to_win}
                        onChange={(e: any) => {
                          updateRoom({ points_to_win: e.target.value });
                        }}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={16}>16</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                      </Select>
                    ),
                  },
                  {
                    name: "Max players",
                    value: room.max_players.toString(),
                    component: (
                      <Select
                        value={room.max_players}
                        onChange={(e: any) =>
                          updateRoom({ max_players: e.target.value })
                        }
                      >
                        <option value={4}>4</option>
                        <option value={6}>6</option>
                        <option value={10}>10</option>
                        <option value={24}>24</option>
                        <option value={64}>64</option>
                      </Select>
                    ),
                  },
                  {
                    name: "Game set",
                    value: sets().find((set) => set.id === room.set_id)?.name,
                    component: (
                      <Select
                        value={room.set_id}
                        onChange={(e: any) =>
                          updateRoom({ set_id: e.target.value })
                        }
                      >
                        <For each={sets()}>
                          {(set) => <option value={set.id}>{set.name}</option>}
                        </For>
                      </Select>
                    ),
                  },
                ]}
              />
              <div
                class={css({
                  marginTop: "2rem",
                })}
              >
                <Show when={user.profile?.id === room.host_id}>
                  <Button variant="primary" onClick={() => handleCreateGame()}>
                    Start the game
                  </Button>
                </Show>
              </div>
            </StyledList>
          </Show>
        </div>
      </div>
    </Layout>
  );
};

export default Room;
