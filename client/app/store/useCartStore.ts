import { create } from "zustand";

type CartState = {
  count: number;
  addToCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  count: 0,
  addToCart: () => set((state) => ({ count: state.count + 1 })),
}));
