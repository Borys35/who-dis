import { Component, For } from "solid-js";
import { styled } from "solid-styled-components";
import OptionsListItem, { OptionProps } from "./OptionsListItem";

interface Props {
  isHost: boolean;
  options: Omit<OptionProps, "isHost">[];
}

const StyledContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const OptionsList: Component<Props> = (props) => {
  return (
    <StyledContainer>
      <For each={props.options}>
        {(option) => (
          <OptionsListItem
            name={option.name}
            value={option.value}
            component={option.component}
            isHost={props.isHost}
          />
        )}
      </For>
    </StyledContainer>
  );
};

export default OptionsList;
