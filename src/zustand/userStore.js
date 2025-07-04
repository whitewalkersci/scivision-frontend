import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserData = create(
  persist(
    (set) => ({
      username: "",
      role: "",
      user_id: "",
      setUserdata: (data) =>
        set({
          username: data.username,
          role: username.role,
          user_id: data.user_id,
        }),
      resetUserdata: () =>
        set({
          username: "",
          role: "",
          user_id: "",
        }),
    }),
    {
      name: "user-storage",
    }
  )
);
