import { Product } from "src/app/pages/products/model/product";

export type Cart = {
  id: number | undefined;
  userId: number;
  date: string;
  products: Product[];
};
