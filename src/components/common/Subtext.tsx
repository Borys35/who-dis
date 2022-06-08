import { styled } from "solid-styled-components";

const Subtext = styled.span<{ size?: "small" | "large" }>(
  ({ theme, size = "small" }) => ({
    color: theme?.colors.grey,
    letterSpacing: "0.075rem",
    textTransform: "uppercase",
    fontWeight: "bold",
    transformOrigin: "50% 50%",
    fontSize: size === "small" ? "0.9rem" : "1.4rem",
  })
);

export default Subtext;
