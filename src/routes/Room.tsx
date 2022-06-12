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
import { css, styled } from "solid-styled-components";
import OptionsList from "../components/blocks/OptionsList";
import PlayersList from "../components/blocks/PlayersList";
import Button from "../components/common/Button";
import Select from "../components/common/Select";
import Subtext from "../components/common/Subtext";
import Layout from "../components/global/Layout";
import { supabase } from "../helpers/supabase/supabaseClient";
import { useUser } from "../providers/UserProvider";
import { GameSetType, PlayerType, RoomType } from "../typings";

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
    } catch (e: any) {
      alert(e.message);
      router.replace("/");
    }
  });

  onCleanup(() => {
    supabase.removeAllSubscriptions();
    // supabase.from<RoomType>("rooms").delete().match({ id: id() });
  });

  async function updateRoom(values: Partial<RoomType>) {
    // const { data, error } =
    await supabase
      .from<RoomType>("rooms")
      .update(values)
      .match({ id: room.id });
  }

  return (
    <Layout pageTitle="Creating room">
      <div
        class={css({
          marginTop: "4rem",
        })}
      >
        <h1
          class={css({
            marginBottom: "4rem",
          })}
        >
          Game room
        </h1>
      </div>
      <div
        class={css({
          display: "flex",
          gap: "6rem",
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
                <Button variant="primary">Start the game</Button>
              </Show>
            </div>
          </StyledList>
        </Show>
      </div>
    </Layout>
  );
};

export default Room;
