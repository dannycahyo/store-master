type CartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
};

type Cart = {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

type CartRequestParams = {
  limit?: number;
  skip?: number;
};

type CartRespose = {
  total: number;
  carts: Cart[];
  skip: number;
  limit: number;
};

export type { Cart, CartProduct, CartRequestParams, CartRespose };
