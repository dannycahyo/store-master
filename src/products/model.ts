type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type ProductMapped = {
  id: number;
  title: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
};

export type { Product, ProductsResponse, ProductMapped };
