import { Product } from "src/app/pages/products/model/product";

export type Cart = {
  id: number;
  userId: number;
  date: string;
  products: Array<Product & { quantity: number }>;
};
