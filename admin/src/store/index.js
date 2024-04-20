import { create } from "zustand";

const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isOTPLevel: false,
  optData: JSON.parse(localStorage.getItem("opt_data")),
  signInModal: false,

  signIn: (data) => set({ user: data }),

  setOPT: (val) => set((state) => ({ isOTPLevel: val })),

  signout: () => set({ user: {} }),

  setSignInModal: (val) =>
    set(
      {signInModal: val}),
}));

export default useStore;
