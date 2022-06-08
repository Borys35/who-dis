import { Component, JSX } from "solid-js";
import { Title } from "solid-meta";
import { styled } from "solid-styled-components";
import GlobalStyle from "../../styles/GlobalStyle";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: JSX.Element;
  pageTitle: string;
}

const StyledContainer = styled.div``;

const Layout: Component<Props> = ({ children, pageTitle }) => {
  return (
    <StyledContainer>
      <>
        <Title>{pageTitle} - Who dis?</Title>
      </>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <GlobalStyle />
    </StyledContainer>
  );
};

export default Layout;
