import {
  Component,
  createSignal,
  For,
  Match,
  onCleanup,
  Switch,
} from "solid-js";
import { css, styled } from "solid-styled-components";
import Inbox from "./Inbox";
import Reply from "./Reply";

interface Props {
  messages: { type: "inbox" | "reply"; content: string }[];
}

const StyledContainer = styled.div({
  position: "relative",
  padding: "0.75rem 1.5rem",
  minHeight: "300px",
});

const StyledBackground = styled.svg({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "fill",
  zIndex: -1,
});

const Phone: Component<Props> = (props) => {
  const [date, setDate] = createSignal(new Date());

  const interval = setInterval(() => {
    setDate(new Date());
  }, 1000);

  onCleanup(() => {
    clearInterval(interval);
  });

  return (
    <StyledContainer>
      {/* <StyledBackground src={phone} alt="Phone" /> */}
      <StyledBackground>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 382 393"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <mask id="path-1-inside-1_62_21" fill="white">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M119 0L48 7.62939e-06C21.4903 7.62939e-06 0 21.4903 0 48V345C0 371.51 21.4903 393 48 393H334C360.51 393 382 371.51 382 345V48C382 21.4903 360.51 7.62939e-06 334 7.62939e-06L263 0C263 10.9344 254.136 19.7985 243.202 19.7985H138.798C127.864 19.7985 119 10.9344 119 0Z"
            />
          </mask>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M119 0L48 7.62939e-06C21.4903 7.62939e-06 0 21.4903 0 48V345C0 371.51 21.4903 393 48 393H334C360.51 393 382 371.51 382 345V48C382 21.4903 360.51 7.62939e-06 334 7.62939e-06L263 0C263 10.9344 254.136 19.7985 243.202 19.7985H138.798C127.864 19.7985 119 10.9344 119 0Z"
            fill="#0084FF"
            fill-opacity="0.2"
          />
          <path
            d="M48 7.62939e-06L48 1.00001L48 1.00001L48 7.62939e-06ZM119 0H120V-1L119 -1L119 0ZM334 7.62939e-06L334 1.00001H334V7.62939e-06ZM263 0L263 -1L262 -1V0H263ZM48 1.00001L119 1L119 -1L48 -0.999992L48 1.00001ZM1 48C1 22.0426 22.0426 1.00001 48 1.00001V-0.999992C20.938 -0.999992 -1 20.9381 -1 48H1ZM1 345V48H-1V345H1ZM48 392C22.0426 392 1 370.957 1 345H-1C-1 372.062 20.9381 394 48 394V392ZM334 392H48V394H334V392ZM381 345C381 370.957 359.957 392 334 392V394C361.062 394 383 372.062 383 345H381ZM381 48V345H383V48H381ZM334 1.00001C359.957 1.00001 381 22.0426 381 48H383C383 20.9381 361.062 -0.999992 334 -0.999992V1.00001ZM263 1L334 1.00001L334 -0.999992L263 -1L263 1ZM262 0C262 10.3821 253.584 18.7985 243.202 18.7985V20.7985C254.688 20.7985 264 11.4867 264 0H262ZM243.202 18.7985H138.798V20.7985H243.202V18.7985ZM138.798 18.7985C128.416 18.7985 120 10.3821 120 0H118C118 11.4867 127.312 20.7985 138.798 20.7985V18.7985Z"
            fill="#0084FF"
            fill-opacity="0.5"
            mask="url(#path-1-inside-1_62_21)"
          />
        </svg>
      </StyledBackground>

      <div
        class={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.85rem",
          marginBottom: "3rem",
        })}
      >
        <span>
          {date().getHours()}:{date().getMinutes() <= 9 && "0"}
          {date().getMinutes()}
        </span>
        <span>69%</span>
      </div>

      <div
        class={css({
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        })}
      >
        <For each={props.messages}>
          {(message) => (
            <Switch>
              <Match when={message.type === "inbox"}>
                <Inbox
                  message={message.content}
                  class={css({ alignSelf: "flex-start" })}
                />
              </Match>
              <Match when={message.type === "reply"}>
                <Reply
                  selected={true}
                  message={message.content}
                  class={css({ alignSelf: "flex-end" })}
                />
              </Match>
            </Switch>
          )}
        </For>
      </div>
    </StyledContainer>
  );
};

export default Phone;
