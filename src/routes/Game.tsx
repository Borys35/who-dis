import { css, styled } from "solid-styled-components";
import PlayersList from "../components/blocks/PlayersList";
import Button from "../components/common/Button";
import Subtext from "../components/common/Subtext";
import MessageGrid from "../components/game/MessageGrid";
import Phone from "../components/game/Phone";
import Reply from "../components/game/Reply";
import Layout from "../components/global/Layout";

const StyledContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "3fr 5fr 2fr",
  gridTemplateRows: "4fr 1fr",
  gap: "2rem",
  marginTop: "2rem",
});

const StyledSubtext = styled(Subtext)({
  display: "block",
  marginBottom: "1rem",
});

const Game = () => {
  return (
    <Layout pageTitle="Game">
      <StyledContainer>
        <div>
          <Phone
            messages={[
              { type: "inbox", content: "Bla blah" },
              { type: "reply", content: "Blah" },
            ]}
          />
        </div>
        <div>
          <StyledSubtext>Replies</StyledSubtext>
          <MessageGrid>
            <Reply message="Hi" />
            <Reply message="Hi" />
          </MessageGrid>
        </div>
        <div>
          <StyledSubtext>Players</StyledSubtext>
          <PlayersList
            players={[{ id: "", name: "sdsds", points: 2 }]}
            showPoints={true}
          />
        </div>
        <div
          class={css({
            gridColumn: "1 / 4",
          })}
        >
          <StyledSubtext>Your hand</StyledSubtext>
          <div class={css({ display: "flex", gap: "2rem" })}>
            <div
              class={css({
                flex: "1",
              })}
            >
              <MessageGrid>
                <Reply message="Hi" clickable={true} />
              </MessageGrid>
            </div>
            <div>
              <Button variant="secondary" disabled={true}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </StyledContainer>
    </Layout>
  );
};

export default Game;
