import { create } from "zustand";

import { getUsers } from "../api/dataApi/usersApi";
import { immer } from "zustand/middleware/immer";

const useUserStore = create()(
  immer((set) => ({
    usersList: [],
    isloading: false,
    error: null,

    getUsers: async () => {
      set({ isloading: true, error: null });
      try {
        const response = await getUsers();
        set({ usersList: response.data, isloading: false });
      } catch (error) {
        set({ error: error.message, isloading: false });
      }
    },
  }))
);
