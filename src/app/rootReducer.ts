import { combineReducers } from "@reduxjs/toolkit";
import actionsReducer from "../features/actions/actionsSlice";
import cartReducer from "../features/actions/cartSlice";

const rootReducer = combineReducers({
  actions: actionsReducer,
  cart: cartReducer,
});

export default rootReducer;
