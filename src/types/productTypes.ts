import { Ingredient } from "./ingredient";

export interface ProductRequest {
  name: string;
  image: string;
  items: Ingredient[];
  ingredients: Ingredient[];
}
