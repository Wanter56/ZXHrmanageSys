import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
interface CommonStore {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
export const useCommonStore = create<CommonStore>()(
  immer((set) => ({
    collapsed: false,
    setCollapsed: (collapsed) => set({ collapsed }),
  }))
);
