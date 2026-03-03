import { type RootState } from "../../app/store";

export const selectCart = (state: RootState) => state.cart.items;
