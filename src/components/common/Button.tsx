import { Link } from "@rturnq/solid-router";
import classNames from "classnames";
import { Component, JSX } from "solid-js";
import { css } from "solid-styled-components";
import theme from "../../styles/theme";

interface Props {
  children: JSX.Element;
  to?: string;
  href?: string;
  toNewTab?: boolean;
  onClick?: () => void;
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

const Button: Component<Props> = ({
  children,
  to,
  href,
  toNewTab,
  onClick,
  variant = "secondary",
}) => {
  const classList = classNames(ButtonClass, {
    [ButtonSecondaryClass]: variant === "secondary",
  });

  if (to)
    return (
      <Link class={classList} href={to}>
        {children}
      </Link>
    );

  if (href)
    return (
      <a class={classList} href={href} target={toNewTab ? "_blank" : "_self"}>
        {children}
      </a>
    );

  return (
    <button class={classList} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
