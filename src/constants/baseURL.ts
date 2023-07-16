const productBaseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/products"
    : process.env.NEXT_PUBLIC_PRODUCT_API_URL ??
      process.env.STORYBOOK_PUBLIC_PRODUCT_API_URL;

const cartsBaseURL =
  `${process.env.NEXT_PUBLIC_API_URL}/carts` ??
  `${process.env.STORYBOOK_PUBLIC_API_URL}/carts`;

export { productBaseURL, cartsBaseURL };
