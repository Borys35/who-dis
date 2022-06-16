import { Session } from "@supabase/supabase-js";
import { Component, createContext, JSX, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { ProfileType } from "../typings";

interface Props {
  children: JSX.Element;
}

const createUserContext = () => {
  const [user, setUser] = createStore<{
    session?: Session | null;
    profile?: ProfileType | null;
    loading: boolean;
  }>({ loading: true });

  const setSession = (s?: Session | null) => {
    setUser("session", s);
  };
  const setProfile = (p?: ProfileType | null) => {
    setUser("profile", p);
  };
  const setLoading = (l: boolean) => {
    setUser("loading", l);
  };

  return [user, { setSession, setProfile, setLoading }] as const;
};
type UserContextType = ReturnType<typeof createUserContext>;
const UserContext = createContext<UserContextType>(createUserContext());
export const useUser = () => useContext(UserContext)!;

const UserProvider: Component<Props> = ({ children }) => {
  return (
    <UserContext.Provider value={createUserContext()}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
