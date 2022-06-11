import { useRouter } from "@rturnq/solid-router";
import { Session } from "@supabase/supabase-js";
import { createSignal } from "solid-js";
import { supabase } from "../../helpers/supabase/supabaseClient";
import {
  GuestSession,
  isGuest,
  useSession,
} from "../../providers/SessionProvider";
import { RoomType } from "../../typings";
import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";

const CreateRoomForm = () => {
  const [name, setName] = createSignal("");
  const [session] = useSession();
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const sess = session();
      if (!sess) return;

      const values: Partial<RoomType> = {
        name: name(),
        max_players: 4,
        round_time: 30,
        points_to_win: 10,
        players: [],
        set_id: "ea90cf8b-4a12-4331-8641-df92b594f4b4",
        host_id: isGuest(sess)
          ? (sess as GuestSession).id
          : (sess as Session).user?.id,
      };

      const { data, error } = await supabase
        .from<RoomType>("rooms")
        .insert([values]);

      if (error) throw error;
      const room = data[0];

      router.push(`/room/${room.id}`);
    } catch (e: any) {
      alert(e.message);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Room name"
        value={name()}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="primary">Create room</Button>
    </Form>
  );
};

export default CreateRoomForm;
