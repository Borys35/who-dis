import { useRouter } from "@rturnq/solid-router";
import { Component, createEffect, JSX, Show } from "solid-js";
import { useUser } from "../../providers/UserProvider";

const PrivateRoute: Component<{ children: JSX.Element }> = ({ children }) => {
  const router = useRouter();
  const [user] = useUser();

  createEffect(() => {
    if (!user.profile) router.replace("/login");
  });

  return <Show when={user.profile}>{children}</Show>;
};

export default PrivateRoute;
