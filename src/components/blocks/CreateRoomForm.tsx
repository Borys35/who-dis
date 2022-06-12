import { useRouter } from "@rturnq/solid-router";
import { createSignal } from "solid-js";
import { supabase } from "../../helpers/supabase/supabaseClient";
import { useUser } from "../../providers/UserProvider";
import { RoomType } from "../../typings";
import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";

const CreateRoomForm = () => {
  const [name, setName] = createSignal("");
  const [user] = useUser();
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const values: Partial<RoomType> = {
        name: name(),
        max_players: 4,
        round_time: 30,
        points_to_win: 10,
        players: [],
        set_id: "ea90cf8b-4a12-4331-8641-df92b594f4b4",
        host_id: user.profile?.id,
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
