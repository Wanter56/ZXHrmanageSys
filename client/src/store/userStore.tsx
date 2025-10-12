import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { getUsers } from "@api/users/usersApi";
import { getAnalyzeStaff } from "@api/dashboard/analyzeStaffApi";

//引入自定义函数
import { useWorkerStats } from "@hooks/useWorkerStats";
export const useUserStore = create()(
  immer((set, get) => ({
    usersList: [],
    otherUserData: {
      total: 0,
      over10Years: 0,
      over3Years: 0,
      within1Year: 0,
    },
    analyzeStaffData: [],
    isloading: false,
    error: null,

    //用户列表的数据请求
    fetchUsers: async () => {
      set({ isloading: true, error: null });
      try {
        const response = await getUsers();
        set({ usersList: response, isloading: false });
      } catch (error: any) {
        set({ error: error.message, isloading: false });
      }
    },

    //用户的一些统计数据
    getUserStats: (targetYear: number) => {
      const { usersList } = get() as any;
      if (!usersList || usersList.length === 0) {
        return {
          total: 0,
          over10Years: 0,
          over3Years: 0,
          within1Year: 0,
        };
      }
      const total = usersList.length;
      const over10Years = useWorkerStats(usersList, targetYear, 10);
      const over3Years =useWorkerStats(usersList, targetYear, 3);
      const within1Year = useWorkerStats(usersList, targetYear, 0) - useWorkerStats(usersList, targetYear, 1);

      set({
        otherUserData: {
          total,
          over10Years,
          over3Years,
          within1Year,
        },
      });
    },

    //analyzeStaffData的数据请求
    fetchAnalyzeStaff: async () => {
      set({ isloading: true, error: null });
      try {
        const response = await getAnalyzeStaff();
        set({ analyzeStaffData: response.data, isloading: false });
      } catch (error: any) {
        set({ error: error.message, isloading: false });
      }
    },
  }))
);
