import { Component, Show } from "solid-js";
import { styled } from "solid-styled-components";
import { PlayerType } from "../../typings";

interface Props {
  player: PlayerType;
  showPoints: boolean;
}

const StyledContainer = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "1.5rem",
  alignItems: "center",
  padding: "0.75rem 1rem",
  borderRadius: "1rem",
  minWidth: "200px",
  backgroundColor: theme?.colors.white,
}));

const StyledPoints = styled.span(({ theme }) => ({
  color: theme?.colors.grey,
}));

const PlayersListItem: Component<Props> = (props) => {
  return (
    <StyledContainer>
      <span>{props.player.name}</span>
      <Show when={props.showPoints}>
        <StyledPoints>{props.player.points}</StyledPoints>
      </Show>
    </StyledContainer>
  );
};

export default PlayersListItem;
