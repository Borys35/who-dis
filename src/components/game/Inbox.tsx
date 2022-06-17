import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { Message } from "./Message";

interface Props {
  message: string;
  onClick?: (e: any) => void;
  clickable?: boolean;
  class?: string;
}

const StyledInbox = styled(Message)<Pick<Props, "clickable">>(
  ({ theme, clickable }) => ({
    borderBottomLeftRadius: "0 !important",
    backgroundColor: theme?.colors.white,
    color: theme?.colors.black,

    "&:hover": clickable
      ? {
          filter: "brightness(1.2)",
        }
      : undefined,
  })
);

const Inbox: Component<Props> = (props) => {
  return (
    <StyledInbox
      class={props.class}
      clickable={props.clickable}
      onClick={props.onClick}
    >
      {props.message}
    </StyledInbox>
  );
};

export default Inbox;
