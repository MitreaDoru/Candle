import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
} from "../controllers/order";
const { body } = require("express-validator");
const router = Router();
router.post(
  "/cart",
  [body("cart", "Need to add somthing in cart").isArray({ min: 1 })],
  createOrder,
);
router.get("/orders", getOrders);
router.delete("/order", deleteOrder);
router.patch("/order", updateOrder);
export default router;
