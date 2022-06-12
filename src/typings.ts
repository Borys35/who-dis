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
