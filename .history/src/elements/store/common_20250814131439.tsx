import { create } from "zustand";
interface CommonStore {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
export const useCommonStore = create<CommonStore>((set) => ({
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed }),
}));
