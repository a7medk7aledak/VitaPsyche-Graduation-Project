import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: { id: string; quantity: number }[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // If the item exists, add the difference in quantity
        const quantityDifference =
          action.payload.quantity - existingItem.quantity;
        existingItem.quantity += quantityDifference;
      } else {
        // If the item doesn't exist, add it with the selected quantity
        state.items.push(action.payload);
      }
    },

    // Remove from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
