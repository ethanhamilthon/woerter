import { LanguageType, ProfileType, StateType } from "@/types/user";
import { create } from "zustand";

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
  cleanUser: () => void;
};

export const useAuthStore = create<IAuth>((set) => ({
  state: "loading",
  changeState: (newState: StateType) => set({ state: newState }),
  profile: {
    user: {
      id: "",
      name: "",
      full_name: "",
      email: "",
      avatar: "",
      language: "",
      created_at: "",
    },
    languages: [],
  },
  changeProfile: (newProfile: {
    user: ProfileType;
    languages: LanguageType[];
  }) => set({ profile: newProfile }),
  cleanUser: () =>
    set({
      profile: {
        user: {
          id: "",
          name: "",
          full_name: "",
          email: "",
          avatar: "",
          language: "",
          created_at: "",
        },
        languages: [],
      },
      state: "noinfo",
    }),
}));
