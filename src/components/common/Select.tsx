import { Component, splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { styled } from "solid-styled-components";

interface Props extends JSX.SelectHTMLAttributes<HTMLSelectElement> {
  children: JSX.Element;
}

const StyledSelect = styled.select(({ theme }) => ({
  backgroundColor: theme?.colors.white,
  fontFamily: theme?.fontFamily,
  border: "none",
  borderRadius: "1rem",
  fontSize: "1rem",
  padding: "0.5rem",
}));

const Select: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return <StyledSelect {...others}>{local.children}</StyledSelect>;
};

export default Select;
