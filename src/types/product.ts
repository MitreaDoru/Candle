import type { Ingredient } from "./ingredients";

export type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  ingredients: Ingredient[];
};
export type NewProduct = {
  name: string;
  image: string;
  items: Ingredient[];
  ingredients: Ingredient[];
};
