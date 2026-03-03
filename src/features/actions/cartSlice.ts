import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}
interface CartState {
  items: CartItem[];
}
const loadCartFromStorage = (): CartItem[] => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};
const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (
      state,
      action: PayloadAction<{
        id: number;
        image: string;
        name: string;
        price: number;
        quantity: number;
      }>,
    ) => {
      const existingItem = state.items?.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state.items));
      } else {
        state.items?.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    remove: (
      state,
      action: PayloadAction<{
        id: number;
      }>,
    ) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    increment: (
      state,
      action: PayloadAction<{
        id: number;
      }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (!item) return;
      item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decrement: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
  },
});

export const { add, remove, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
