import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { PlayerType } from "../../typings";

interface Props {
  player: PlayerType;
}

const StyledContainer = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "1.5rem",
  alignItems: "center",
  padding: "1rem 1.25rem",
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
      <StyledPoints>{props.player.points}</StyledPoints>
    </StyledContainer>
  );
};

export default PlayersListItem;
