import { Component, JSX, Match, Switch } from "solid-js";
import { styled } from "solid-styled-components";

export interface OptionProps {
  name: string;
  value?: string;
  component?: JSX.Element;
  isHost: boolean;
}

const StyledContainer = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "1.5rem",
  alignItems: "center",
  minWidth: "300px",
  fontSize: "1.25rem",
}));

const OptionsListItem: Component<OptionProps> = (props) => {
  return (
    <StyledContainer>
      <span>{props.name}</span>
      <Switch>
        <Match when={!props.isHost}>
          <span>{props.value}</span>
        </Match>
        <Match when={props.isHost}>{props.component}</Match>
      </Switch>
    </StyledContainer>
  );
};

export default OptionsListItem;
