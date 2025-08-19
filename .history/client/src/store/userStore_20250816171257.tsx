import { create } from "zustand";

import { getUsers } from "../api/dataApi/usersApi";
import { immer } from "zustand/middleware/immer";

//引入自定义hook
import useWorkerStats from "../common/func/user/useWorkerStats";

const useUserStore = create()(
  immer((set) => ({
    usersList: [],
    isloading: false,
    error: null,
    otherUserData: {
      total: 0,
      over10Years: 0,
      over3Years: 0,
      within1Year: 0,
      tenWorkersLongest: [],
    },
    //用户的CRUD操作
    getUsers: async () => {
      set({ isloading: true, error: null });
      try {
        const response = await getUsers();
        set({ usersList: response.data, isloading: false });
      } catch (error) {
        set({ error: error.message, isloading: false });
      }
    },

    //用户的一些统计数据
  }))
);
