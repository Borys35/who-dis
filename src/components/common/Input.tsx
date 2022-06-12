import { Component } from "solid-js";
import { styled } from "solid-styled-components";

interface Props {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: any) => void;
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
  pointerEvents: "none",
}));
const StyledInput = styled.input(({ theme }) => ({
  all: "unset",
  fontFamily: theme?.fontFamily,
  borderRadius: "2rem",
  backgroundColor: theme?.colors.white,
  padding: "0.5rem 1rem",
  textAlign: "left",

  "&:focus + label, &:valid + label": {
    top: "-0.65rem",
    fontSize: "0.9rem",
    color: theme?.colors.grey,
  },
}));

const Input: Component<Props> = ({ label, type = "text", value, onChange }) => {
  return (
    <StyledContainer>
      <StyledInput required type={type} value={value} onChange={onChange} />
      <StyledLabel>{label}</StyledLabel>
    </StyledContainer>
  );
};

export default Input;
