import { styled } from "solid-styled-components";

const StyledFooter = styled.footer(({ theme }) => ({
  padding: "1rem 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "0.5rem",
  fontSize: "0.9rem",
  color: theme?.colors.grey,

  [theme!.mq.tablet]: {
    flexDirection: "row",
    alignItems: "center",
  },
}));

const StyledLinks = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
});

const Footer = () => {
  return (
    <StyledFooter>
      <span>&copy; {new Date().getFullYear()} Borys Kaczmarek</span>
      <StyledLinks>
        <a href="https://github.com/Borys35" target="_blank">
          github
        </a>
        <a href="https://borys35.github.io/" target="_blank">
          my website
        </a>
      </StyledLinks>
    </StyledFooter>
  );
};

export default Footer;
