import { Session } from "@supabase/supabase-js";
import {
  Component,
  createContext,
  createSignal,
  JSX,
  useContext,
} from "solid-js";

interface Props {
  children: JSX.Element;
}

const createSessionContext = () => {
  const [session, setSession] = createSignal<Session | null>(null);

  return [session, { setSession }] as const;
};
type SessionContextType = ReturnType<typeof createSessionContext>;
const SessionContext = createContext<SessionContextType>(
  createSessionContext()
);
export const useSession = () => useContext(SessionContext)!;

const SessionProvider: Component<Props> = ({ children }) => {
  return (
    <SessionContext.Provider value={createSessionContext()}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
