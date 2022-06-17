import { Component, For } from "solid-js";
import { styled } from "solid-styled-components";
import { PlayerType } from "../../typings";
import PlayersListItem from "./PlayersListItem";

interface Props {
  players: PlayerType[];
  showPoints: boolean;
}

const StyledContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  maxHeight: "500px",
  overflowY: "auto",
});

const PlayersList: Component<Props> = (props) => {
  return (
    <StyledContainer>
      <For each={props.players}>
        {(player) => (
          <PlayersListItem showPoints={props.showPoints} player={player} />
        )}
      </For>
    </StyledContainer>
  );
};

export default PlayersList;
