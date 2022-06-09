import { Link } from "@rturnq/solid-router";
import classNames from "classnames";
import { Component, JSX, mergeProps } from "solid-js";
import { css } from "solid-styled-components";
import theme from "../../styles/theme";

interface Props {
  children: JSX.Element;
  to?: string;
  href?: string;
  toNewTab?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const ButtonClass = css({
  all: "unset",
  padding: "0.75rem 1.5rem",
  borderRadius: "2rem",
  border: `1px solid ${theme.colors.primary}`,
  backgroundColor: theme.colors.primary,
  color: theme.colors.white,
  fontFamily: theme.fontFamily,
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.1s ease-in-out",

  "&:hover": {
    filter: "brightness(110%)",
  },

  "&:active": {
    filter: "brightness(90%)",
  },
});

const ButtonSecondaryClass = css({
  border: `1px solid ${theme.colors.black}`,
  color: theme.colors.black,
  backgroundColor: theme.colors.background,
});

const ButtonDisabledClass = css({
  opacity: "0.5",
  cursor: "default",
  pointerEvents: "none",
});

const Button: Component<Props> = (props) => {
  const merged = mergeProps({ variant: "secondary", disabled: false }, props);
  const classList = () =>
    classNames(
      ButtonClass,
      {
        [ButtonSecondaryClass]: merged.variant === "secondary",
      },
      { [ButtonDisabledClass]: merged.disabled }
    );

  if (props.to)
    return (
      <Link class={classList()} href={props.to}>
        {props.children}
      </Link>
    );

  if (props.href)
    return (
      <a
        class={classList()}
        href={props.href}
        target={props.toNewTab ? "_blank" : "_self"}
      >
        {props.children}
      </a>
    );

  return (
    <button class={classList()} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
