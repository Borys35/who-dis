import { css } from "solid-styled-components";
import AuthForm from "../components/blocks/AuthForm";
import GuestAuthForm from "../components/blocks/GuestAuthForm";
import Subtext from "../components/common/Subtext";
import Layout from "../components/global/Layout";

const Login = () => {
  return (
    <Layout pageTitle="Login">
      <div
        class={css({
          marginTop: "4rem",
        })}
      >
        <h1
          class={css({
            marginBottom: "0.5rem",
          })}
        >
          Login
        </h1>
        <p
          class={css({
            marginBottom: "4rem",
          })}
        >
          Sign in/up or log in as guest
        </p>
        <div
          class={css({
            display: "flex",
            gap: "3rem",
            alignItems: "flex-start",
          })}
        >
          <AuthForm />
          <Subtext
            class={css({ transform: "rotate(5deg)", alignSelf: "center" })}
            size="large"
          >
            Or
          </Subtext>
          <GuestAuthForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
