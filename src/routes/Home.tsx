import { css } from "solid-styled-components";
import CreateRoomForm from "../components/blocks/CreateRoomForm";
import JoinRoomForm from "../components/blocks/JoinRoomForm";
import Subtext from "../components/common/Subtext";
import Layout from "../components/global/Layout";

const Home = () => {
  return (
    <Layout pageTitle="Home">
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
            gap: "3rem",
            alignItems: "flex-start",
          })}
        >
          <JoinRoomForm />
          <Subtext
            class={css({ transform: "rotate(5deg)", alignSelf: "center" })}
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
