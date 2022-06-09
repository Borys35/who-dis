import { useRouter } from "@rturnq/solid-router";
import { Component, createEffect, JSX, Show } from "solid-js";
import { useSession } from "../../providers/SessionProvider";

const PublicOnlyRoute: Component<{ children: JSX.Element }> = ({
  children,
}) => {
  const router = useRouter();
  const [session] = useSession();

  createEffect(() => {
    if (session()) router.replace("/");
  });

  return <Show when={session() === null}>{children}</Show>;
};

export default PublicOnlyRoute;
