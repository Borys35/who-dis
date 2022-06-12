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
  }>({});

  const setSession = (s?: Session | null) => {
    setUser("session", s);
  };
  const setProfile = (p?: ProfileType | null) => {
    setUser("profile", p);
  };

  return [user, { setSession, setProfile }] as const;
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
