import { useRouter } from "@rturnq/solid-router";
import { Session } from "@supabase/supabase-js";
import { Component, createSignal, For, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { css, styled } from "solid-styled-components";
import OptionsList from "../components/blocks/OptionsList";
import PlayersList from "../components/blocks/PlayersList";
import Button from "../components/common/Button";
import Select from "../components/common/Select";
import Subtext from "../components/common/Subtext";
import Layout from "../components/global/Layout";
import { supabase } from "../helpers/supabase/supabaseClient";
import {
  GuestSession,
  isGuest,
  useSession,
} from "../providers/SessionProvider";
import { GameSetType, RoomType } from "../typings";

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
  const [options, setOptions] = createStore({
    roundTime: 60,
    pointsToWin: 5,
    maxPlayers: 4,
    gameSet: false,
  });
  const router = useRouter();
  const [session] = useSession();
  const userId = () => {
    const sess = session();
    if (sess === null) return;

    if (isGuest(sess)) return (sess as GuestSession).id;

    return (sess as Session).user?.id;
  };

  onMount(async () => {
    try {
      // Get room
      const { data, error } = await supabase
        .from<RoomType>("rooms")
        .select()
        .eq("id", props.id);

      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Room not found");

      const roomData = data[0];
      setRoom(roomData);

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

  // onCleanup(() => {
  //   supabase.from<RoomType>("rooms").delete().match({ id: id() });
  // });

  async function updateRoom(values: Partial<RoomType>) {
    const { data, error } = await supabase
      .from<RoomType>("rooms")
      .update(values)
      .match({ id: room.id });
    console.log(data, error);
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
        <StyledList>
          <Subtext>Players (2/{options.maxPlayers})</Subtext>
          <PlayersList
            players={[
              { name: "Player 1", points: 2 },
              { name: "Player 2", points: 12 },
            ]}
          />
        </StyledList>
        <StyledList>
          <Subtext>Options</Subtext>
          <OptionsList
            isHost={userId() === room.host_id}
            options={[
              {
                name: "Round time",
                value: `${options.roundTime}s`,
                component: (
                  <Select
                    value={options.roundTime}
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
                value: options.pointsToWin.toString(),
                component: (
                  <Select
                    value={options.pointsToWin}
                    onChange={(e: any) => {
                      updateRoom({ points_to_win: e.target.value });
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>16</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                  </Select>
                ),
              },
              {
                name: "Max players",
                value: options.maxPlayers.toString(),
                component: (
                  <Select
                    value={options.maxPlayers}
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
                value: options.gameSet.toString(),
                component: (
                  <Select
                    value={options.roundTime}
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
            <Button variant="primary">Start the game</Button>
          </div>
        </StyledList>
      </div>
    </Layout>
  );
};

export default Room;
