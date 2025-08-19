import { create } from "zustand";

import { getUsers } from "../api/dataApi/usersApi";
import { immer } from "zustand/middleware/immer";




// 引入接口定义
import type { User, TableItem } from "../api/interface/user";


//引入自定义函数 
import { countWorkYears} from "../common/func/user/useWorkerStats";


const useUserStore = create()(
  immer((set, get) => ({
    usersList: [],
    isloading: false,
    error: null,
    otherUserData: {
      total: 0,
      over10Years: 0,
      over3Years: 0,
      within1Year: 0,
    },
    //用户的CRUD操作
    fetchUsers: async () => {
      set({ isloading: true, error: null });
      try {
        const response = await getUsers();
        set({ usersList: response.data, isloading: false });
      } catch (error) {
        set({ error: error.message, isloading: false });
      }
    },

    //用户的一些统计数据
    getUserStats: (targetYear: number) => {
      const { usersList } = get();
      if (!usersList || usersList.length === 0) {
        return {
          total: 0,
          over10Years: 0,
          over3Years: 0,
          within1Year: 0,
        };
      }

      const total = usersList.length;
      const over10Years = countWorkYears(usersList, targetYear, 10);
      const over3Years = countWorkYears(usersList, targetYear, 3);
      const within1Year = countWorkYears(usersList, targetYear, 1);

      set({
        otherUserData: {
          total,
          over10Years,
          over3Years,
          within1Year,
        },
      });
    },
  }))
);

export default useUserStore;
