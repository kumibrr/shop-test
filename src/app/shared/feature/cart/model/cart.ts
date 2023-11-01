export type Cart = {
  id: number;
  userId: number;
  date: string;
  products: ProductSlice[];
};

interface ProductSlice {
  productId: number;
  quantity: number;
}
