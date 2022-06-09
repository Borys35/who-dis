import { useRouter } from "@rturnq/solid-router";
import { Component, createEffect, JSX, Show } from "solid-js";
import { useSession } from "../../providers/SessionProvider";

const PrivateRoute: Component<{ children: JSX.Element }> = ({ children }) => {
  const router = useRouter();
  const [session] = useSession();

  createEffect(() => {
    if (session() === null) router.replace("/login");
  });

  return <Show when={session()}>{children}</Show>;
};

export default PrivateRoute;
