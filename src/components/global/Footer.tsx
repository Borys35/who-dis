import { styled } from "solid-styled-components";

const StyledFooter = styled.footer(({ theme }) => ({
  padding: "1rem 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.9rem",
  color: theme?.colors.grey,
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
