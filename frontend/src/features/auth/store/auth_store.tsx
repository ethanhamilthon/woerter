import { create } from "zustand";

type StateType = "logged" | "loading" | "noinfo";
export type ProfileType = {
  name: string;
  full_name: string;
  email: string;
  avatar: string;
  language: string;
};

export type LanguageType = {
  name: string;
};

type IAuth = {
  state: StateType;
  changeState: (newState: StateType) => void;
  profile: {
    user: ProfileType;
    languages: LanguageType[];
  };
  changeProfile: (newProfile: {
    user: ProfileType;
    languages: LanguageType[];
  }) => void;
};

export const useAuthStore = create<IAuth>((set) => ({
  state: "loading",
  changeState: (newState: StateType) => set({ state: newState }),
  profile: {
    user: {
      name: "",
      full_name: "",
      email: "",
      avatar: "",
      language: "",
    },
    languages: [],
  },
  changeProfile: (newProfile: {
    user: ProfileType;
    languages: LanguageType[];
  }) => set({ profile: newProfile }),
}));
