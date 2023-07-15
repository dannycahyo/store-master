import { useEffect } from "react";
import { useRouter } from "next/router";
import { match } from "ts-pattern";
import { Skeleton } from "@chakra-ui/react";

import { ProductFilter, ProductTable } from "@src/products/components";
import {
  useGetAllProductsBrands,
  useGetAllProductsCategories,
  useGetProducts,
} from "@src/products/services";
import { GeneralError, Pagination, TableSkeleton } from "@src/uikits";
import { getQuery, debounce } from "@src/utils";
import { useProductListWidgetReducer } from "./ProductListWidget.reducer";

import type React from "react";

const ProductListWidget: React.FC = () => {
  const router = useRouter();

  const { state, dispatch } = useProductListWidgetReducer();

  const { page, pageSize } = state.pagination;
  const { brandName, categoryName } = state.filter;
  const [minPrice, maxPrice] = state.priceRange;
  const searchProductValue = state.search;

  const { data: categories } = useGetAllProductsCategories({
    staleTime: Infinity,
  });
  const { data: brands, status: brandsStatus } = useGetAllProductsBrands({
    staleTime: Infinity,
  });

  const { data: products, status: productsStatus } = useGetProducts({
    brand: brandName,
    category: categoryName,
    limit: pageSize,
    pMin: minPrice,
    pMax: maxPrice,
    q: searchProductValue,
    skip: (page - 1) * pageSize,
    select: "title,price,stock,brand,category",
  });

  const onBrandChange = (brandName: string) => {
    dispatch({
      type: "SET_FILTER",
      payload: { ...state.filter, brandName },
    });
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          category: undefined,
          brand: brandName,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const onCategoryChange = (categoryName: string) => {
    dispatch({
      type: "SET_FILTER",
      payload: { ...state.filter, categoryName },
    });
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          brand: undefined,
          category: categoryName,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const onPriceRangeChange = (minPrice: number, maxPrice: number) => {
    dispatch({
      type: "SET_PRICE_RANGE",
      payload: [minPrice, maxPrice],
    });
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          pMin: minPrice,
          pMax: maxPrice,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const onSearchProduct = debounce((searchValue: string) => {
    dispatch({
      type: "SET_SEARCH",
      payload: searchValue,
    });
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          q: searchValue,
        },
      },
      undefined,
      { shallow: true },
    );
  }, 3000);

  const onPaginationChange = (page: number, pageSize: number) => {
    dispatch({
      type: "SET_PAGINATION",
      payload: { page, pageSize },
    });

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: page,
          pageSize: pageSize,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    const {
      brand,
      category,
      pMin,
      pMax,
      q,
      page: pageQuery,
      pageSize: pageSizeQuery,
    } = router.query;

    if (brand !== undefined) {
      dispatch({
        type: "SET_FILTER",
        payload: { ...state.filter, brandName: String(brand) },
      });
    }

    if (category !== undefined) {
      dispatch({
        type: "SET_FILTER",
        payload: { ...state.filter, categoryName: String(category) },
      });
    }

    if (pMin !== undefined && pMax !== undefined) {
      dispatch({
        type: "SET_PRICE_RANGE",
        payload: [Number(pMin), Number(pMax)],
      });
    }

    if (q !== undefined) {
      dispatch({ type: "SET_SEARCH", payload: String(q) });
    }

    dispatch({
      type: "SET_PAGINATION",
      payload: {
        page: Number(getQuery<number>(pageQuery, 1)),
        pageSize: Number(getQuery<number>(pageSizeQuery, 10)),
      },
    });
  }, [dispatch, router.query, state.filter]);

  return (
    <>
      {match([brandsStatus, productsStatus])
        .with(["loading", "loading"], () => (
          <Skeleton startColor="purple.500" endColor="blue.500" height="40px" />
        ))
        .with(["success", "success"], () => (
          <ProductFilter
            brands={brands ?? []}
            categories={categories ?? []}
            onBrandChange={onBrandChange}
            onCategoryChange={onCategoryChange}
            onPriceRangeChange={onPriceRangeChange}
            onSearch={onSearchProduct}
          />
        ))
        .with(["error", "error"], () => (
          <GeneralError
            title="Categories & Brands Error!"
            description="There was something wrong when fetching get all categories & brands."
          />
        ))
        .otherwise(() => (
          <Skeleton startColor="purple.500" endColor="blue.500" height="40px" />
        ))}
      <>
        {match(productsStatus)
          .with("loading", () => <TableSkeleton />)
          .with("error", () => (
            <GeneralError
              title="Products Error!"
              description="There was something wrong when fetching get all products."
            />
          ))
          .with("success", () => (
            <ProductTable products={products?.products ?? []} />
          ))
          .exhaustive()}
      </>
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        onChange={onPaginationChange}
        total={products?.total ?? 0}
      />
    </>
  );
};

export { ProductListWidget };
