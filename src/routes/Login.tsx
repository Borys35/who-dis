import { css, useTheme } from "solid-styled-components";
import AuthForm from "../components/blocks/AuthForm";
import GuestAuthForm from "../components/blocks/GuestAuthForm";
import Subtext from "../components/common/Subtext";
import Layout from "../components/global/Layout";

const Login = () => {
  const theme = useTheme();

  return (
    <Layout pageTitle="Login">
      <div
        class={css({
          margin: "4rem 0",
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
            flexDirection: "column",
            gap: "3rem",
            alignItems: "flex-start",

            [theme.mq.tablet]: {
              flexDirection: "row",
            },
          })}
        >
          <AuthForm />
          <Subtext
            class={css({
              transform: "rotate(5deg)",
              [theme.mq.tablet]: { alignSelf: "center" },
            })}
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
