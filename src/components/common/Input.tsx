import { Component } from "solid-js";
import { styled } from "solid-styled-components";

interface Props {
  label: string;
}

const StyledContainer = styled.div({
  position: "relative",
});
const StyledLabel = styled.label(({ theme }) => ({
  // fontWeight: "bold",
  position: "absolute",
  left: "1rem",
  top: "0.5rem",
  transition: "0.2s ease-in-out",
}));
const StyledInput = styled.input(({ theme }) => ({
  all: "unset",
  fontFamily: theme?.fontFamily,
  borderRadius: "2rem",
  backgroundColor: theme?.colors.white,
  padding: "0.5rem 1rem",

  "&:focus + label, &:valid + label": {
    top: "-0.65rem",
    fontSize: "0.9rem",
    color: theme?.colors.grey,
  },
}));

const Input: Component<Props> = ({ label }) => {
  return (
    <StyledContainer>
      <StyledInput required />
      <StyledLabel>{label}</StyledLabel>
    </StyledContainer>
  );
};

export default Input;
