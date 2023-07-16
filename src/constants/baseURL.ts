const productBaseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/products"
    : process.env.NEXT_PUBLIC_PRODUCT_API_URL ??
      process.env.STORYBOOK_PUBLIC_PRODUCT_API_URL;

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.STORYBOOK_PUBLIC_API_URL;
const cartsBaseURL = `${baseURL}/carts` ?? `${baseURL}/carts`;

export { productBaseURL, cartsBaseURL };
