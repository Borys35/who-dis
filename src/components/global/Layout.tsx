import { Component, JSX } from "solid-js";
import { Title } from "solid-meta";
import { styled } from "solid-styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: JSX.Element;
  pageTitle: string;
}

const StyledContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  maxWidth: "1200px",
  margin: "0 auto",
});

const StyledMain = styled.main({
  flex: 1,
});

const Layout: Component<Props> = ({ children, pageTitle }) => {
  return (
    <StyledContainer>
      <>
        <Title>{pageTitle} - Who dis?</Title>
      </>
      <Navbar />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </StyledContainer>
  );
};

export default Layout;
