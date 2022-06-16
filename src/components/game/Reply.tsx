import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { Message } from "./Message";

interface Props {
  message: string;
  onClick?: (e: any) => void;
  selected?: boolean;
  clickable?: boolean;
  class?: string;
}

const StyledReply = styled(Message)<Pick<Props, "selected" | "clickable">>(
  ({ theme, selected = false, clickable = false }) => ({
    borderBottomRightRadius: "0 !important",
    backgroundColor: selected
      ? theme?.colors.message
      : theme?.colors.background,
    color: selected ? theme?.colors.white : theme?.colors.black,
    opacity: selected ? 1 : 0.5,
    transition: ".2s ease-in-out",
    border: `1px solid ${
      selected ? theme?.colors.message : theme?.colors.black
    }`,

    "&:hover": clickable
      ? {
          opacity: 1,
          filter: selected ? "brightness(1.2)" : undefined,
        }
      : undefined,
  })
);

const Reply: Component<Props> = (props) => {
  return (
    <StyledReply
      class={props.class}
      selected={props.selected}
      clickable={props.clickable}
      onClick={props.onClick}
    >
      {props.message}
    </StyledReply>
  );
};

export default Reply;
