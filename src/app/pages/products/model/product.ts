export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  quantity?: number;
};

type Rating = {
  rate: number;
  count: number;
};
