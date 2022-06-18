export interface RoomType {
  id: string;
  created_at: string;
  name: string;
  max_players: number;
  round_time: number;
  points_to_win: number;
  set_id: string;
  host_id: string;
  players: PlayerType[];
}

export interface PlayerType {
  id: string;
  name: string;
  points: number;
  replies: string[];
}

export interface ProfileType {
  id: string;
  username: string;
  email?: string;
}

export interface GameSetType {
  id: string;
  name: string;
  inboxes: string[];
  replies: string[];
}

export interface PlayerHandType {
  id: string;
  replies: string[];
}

export interface GameType {
  id: string;
  set_id: string;
  set: GameSetType;
  picker_id: string;
  room_id: string;
  room: RoomType;
  state: "selecting" | "picking" | "end_of_round" | "end_of_game";
  selected_replies: { player_id: string; reply: string }[];
  picked_reply: { player_id: string; reply: string };
  player_hands: PlayerHandType[];
  remaining_inboxes: string[];
  remaining_replies: string[];
  current_inbox: string;
}
