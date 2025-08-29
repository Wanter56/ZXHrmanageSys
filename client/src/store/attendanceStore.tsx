import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getAttendance } from "@api/dataApi/attendanceApi";

const useAttendanceStore = create(
  immer((set) => ({
    attendanceList: [],
    getAttendanceList: async () => {
      try {
        const response = await getAttendance();
        set({ attendanceList: response.data });
      } catch (error) {
        console.log(error);
      }
    },
  }))
);
export default useAttendanceStore;
