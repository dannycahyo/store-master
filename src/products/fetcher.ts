import { productBaseURL } from "@src/constants";

import type { ProductResponseMapped, ProductRequestParams } from "./model";

const getProducts = async ({
  skip,
  limit,
  select,
  pMin,
  pMax,
  category,
  brand,
  q,
}: ProductRequestParams): Promise<ProductResponseMapped> => {
  let baseURL = `${productBaseURL}`;
  if (category !== undefined) {
    baseURL = `${productBaseURL}/category/${category}`;
  }
  if (brand !== undefined) {
    baseURL = `${productBaseURL}/brand/${brand}`;
  }
  const url = new URL(`${baseURL}`);

  const parameters = {
    skip,
    limit,
    select,
    pMin,
    pMax,
    q,
  };

  for (const param in parameters) {
    const value = parameters[param as keyof typeof parameters];
    if (value !== undefined) {
      url.searchParams.set(param, String(value));
    }
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`JSON response was not ok cause ${error}`);
  }
};

const getAllProductsCategories = async (): Promise<string[]> => {
  const url = new URL(`${productBaseURL}/categories`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`JSON response was not ok cause ${error}`);
  }
};

const getAllProductsBrands = async (): Promise<string[]> => {
  const url = new URL(`${productBaseURL}/brands`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`JSON response was not ok cause ${error}`);
  }
};

export { getProducts, getAllProductsCategories, getAllProductsBrands };
