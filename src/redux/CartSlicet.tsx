import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  qty: number;
  image: string;
  category?: string;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (item) {
        item.qty += action.payload.qty || 1;
      } else {
        state.cart.push({ ...action.payload, qty: action.payload.qty || 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    increaseQty: (state, action: PayloadAction<number | string>) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decreaseQty: (state, action: PayloadAction<number | string>) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
          state.cart = state.cart.filter((i) => i.id !== action.payload);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeItem: (state, action: PayloadAction<number | string>) => {
      state.cart = state.cart.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
