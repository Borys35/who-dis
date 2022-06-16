import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { Message } from "./Message";

interface Props {
  message: string;
  class?: string;
}

const StyledInbox = styled(Message)(({ theme }) => ({
  borderBottomLeftRadius: "0 !important",
  backgroundColor: theme?.colors.background,
  color: theme?.colors.black,
}));

const Inbox: Component<Props> = (props) => {
  return <StyledInbox class={props.class}>{props.message}</StyledInbox>;
};

export default Inbox;
