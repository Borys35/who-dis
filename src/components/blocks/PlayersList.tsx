import { Component, For } from "solid-js";
import { styled } from "solid-styled-components";
import { PlayerType } from "../../typings";
import PlayersListItem from "./PlayersListItem";

interface Props {
  players: PlayerType[];
}

const StyledContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const PlayersList: Component<Props> = (props) => {
  return (
    <StyledContainer>
      <For each={props.players}>
        {(player) => <PlayersListItem player={player} />}
      </For>
    </StyledContainer>
  );
};

export default PlayersList;
