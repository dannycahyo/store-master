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

type ProductResponseMapped = {
  products: ProductMapped[];
  total: number;
  skip: number;
  limit: number;
};

type ProductRequestParams = {
  limit?: number | null;
  skip?: number | null;
  pMin?: number | null;
  pMax?: number | null;
  select?: string | null;
  category?: string | null;
  brand?: string | null;
  q?: string | null;
};

export type {
  Product,
  ProductsResponse,
  ProductMapped,
  ProductRequestParams,
  ProductResponseMapped,
};
