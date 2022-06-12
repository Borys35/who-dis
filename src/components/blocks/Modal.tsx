import { Component, JSX, Show } from "solid-js";
import { styled } from "solid-styled-components";

interface Props {
  children: JSX.Element;
  open: boolean;
}

const StyledShadow = styled.div(({ theme }) => ({
  backgroundColor: `rgba(0, 0, 0, 0.6)`,
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
}));

const StyledContainer = styled.div(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
  padding: "4rem",
  borderRadius: "2rem",
  backgroundColor: theme?.colors.background,
  minWidth: "300px",
  textAlign: "center",
}));

const Modal: Component<Props> = (props) => {
  return (
    <Show when={props.open}>
      <StyledShadow>
        <StyledContainer>{props.children}</StyledContainer>
      </StyledShadow>
    </Show>
  );
};

export default Modal;
