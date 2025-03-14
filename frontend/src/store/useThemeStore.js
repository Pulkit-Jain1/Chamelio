import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chamelio-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chamelio-theme", theme);
    set({ theme });
  },
}));
