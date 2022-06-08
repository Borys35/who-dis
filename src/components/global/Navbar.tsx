import { styled } from "solid-styled-components";

const StyledNav = styled.nav({
  padding: "1rem 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Navbar = () => {
  return (
    <StyledNav>
      <h5>Who dis?</h5>
      <div>Links</div>
    </StyledNav>
  );
};

export default Navbar;
