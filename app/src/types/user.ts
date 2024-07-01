export type StateType = "logged" | "loading" | "noinfo";
export type ProfileType = {
  id: string;
  name: string;
  full_name: string;
  email: string;
  avatar: string;
  language: string;
  created_at: string;
};

export type LanguageType = {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
};
