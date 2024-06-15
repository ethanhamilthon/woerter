import { create } from "zustand";

type StateType = "logged" | "loading" | "noinfo";
export type ProfileType = {
  name: string;
  email: string;
  avatar: string;
  target_language: string;
  os_language: string;
};

type IAuth = {
  state: StateType;
  changeState: (newState: StateType) => void;
  profile: ProfileType;
  changeProfile: (newProfile: ProfileType) => void;
};

export const useAuthStore = create<IAuth>((set) => ({
  state: "noinfo",
  changeState: (newState: StateType) => set({ state: newState }),
  profile: {
    name: "",
    email: "",
    avatar: "",
    target_language: "",
    os_language: "",
  },
  changeProfile: (newProfile: ProfileType) => set({ profile: newProfile }),
}));
