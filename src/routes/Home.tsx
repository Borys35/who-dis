import { css, useTheme } from "solid-styled-components";
import CreateRoomForm from "../components/blocks/CreateRoomForm";
import JoinRoomForm from "../components/blocks/JoinRoomForm";
import Subtext from "../components/common/Subtext";
import Layout from "../components/global/Layout";

const Home = () => {
  const theme = useTheme();

  return (
    <Layout pageTitle="Home">
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
          Who dis?
        </h1>
        <p
          class={css({
            marginBottom: "4rem",
          })}
        >
          Oh, hi mom...
        </p>
        <div
          class={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "3rem",

            [theme.mq.tablet]: {
              flexDirection: "row",
            },
          })}
        >
          <JoinRoomForm />
          <Subtext
            class={css({
              transform: "rotate(5deg)",
              [theme.mq.tablet]: { alignSelf: "center" },
            })}
            size="large"
          >
            Or
          </Subtext>
          <CreateRoomForm />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
