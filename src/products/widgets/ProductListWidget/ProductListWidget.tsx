import { useEffect } from "react";
import { useRouter } from "next/router";
import { match } from "ts-pattern";
import { Box, Flex, Skeleton } from "@chakra-ui/react";

import { ProductFilter, ProductTable } from "@src/products/components";
import {
  useGetAllProductsBrands,
  useGetAllProductsCategories,
  useGetProducts,
} from "@src/products/services";
import { GeneralError, Pagination, TableSkeleton } from "@src/uikits";
import { getQuery } from "@src/utils";
import { useDebounce } from "@src/hooks";
import { useProductListWidgetReducer } from "./ProductListWidget.reducer";

import type React from "react";
import type { ParsedUrlQuery } from "querystring";

const ProductListWidget: React.FC = () => {
  const router = useRouter();

  const { state, dispatch } = useProductListWidgetReducer();

  const { page, pageSize } = state.pagination;
  const { brandName, categoryName } = state.filter;
  const [minPrice, maxPrice] = state.priceRange;
  const searchProductValue = state.search;

  const debouncedSearchProductValue = useDebounce<string>(
    searchProductValue ?? "",
    1000,
  );

  const { data: categories, status: categoriesStatus } =
    useGetAllProductsCategories({
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
    q: debouncedSearchProductValue,
    skip: (page - 1) * pageSize,
    select: "title,price,stock,brand,category",
  });

  const onBrandChange = (brandName: string) => {
    dispatch({
      type: "SET_FILTER",
      payload: { ...state.filter, brandName },
    });

    const newQuery: Record<string, unknown> = {
      ...router.query,
      page: 1,
      brand: brandName,
    };

    delete newQuery.category;

    router.push(
      {
        pathname: router.pathname,
        query: newQuery as ParsedUrlQuery,
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

    const newQuery: Record<string, unknown> = {
      ...router.query,
      page: 1,
      category: categoryName,
    };

    delete newQuery.brand;

    router.push(
      {
        pathname: router.pathname,
        query: newQuery as ParsedUrlQuery,
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
          page: 1,
          pMin: minPrice,
          pMax: maxPrice,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const onSearchProduct = (searchValue: string) => {
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
  };

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

    if (brand !== undefined || category !== undefined) {
      dispatch({
        type: "SET_FILTER",
        payload: {
          brandName: brand !== undefined ? String(brand) : undefined,
          categoryName: category !== undefined ? String(category) : undefined,
        },
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
  }, [dispatch, router.query]);

  return (
    <>
      {match([brandsStatus, categoriesStatus])
        .with(["loading", "loading"], () => (
          <Skeleton startColor="purple.500" endColor="blue.500" height="80px" />
        ))
        .with(["success", "success"], () => (
          <ProductFilter
            brands={brands ?? []}
            categories={categories ?? []}
            formValues={{
              brand: brandName,
              category: categoryName,
              pMin: minPrice,
              pMax: maxPrice,
              q: searchProductValue,
            }}
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
          <Skeleton startColor="purple.500" endColor="blue.500" height="80px" />
        ))}
      <>
        {match(productsStatus)
          .with("loading", () => (
            <Box mt={8}>
              <TableSkeleton />
              <TableSkeleton />
            </Box>
          ))
          .with("error", () => (
            <Box mt={8}>
              <GeneralError
                title="Products Error!"
                description="There was something wrong when fetching get all products."
              />
            </Box>
          ))
          .with("success", () => (
            <Flex flexDir="column" gap={4} mt={8}>
              <ProductTable products={products?.products ?? []} />
              <Pagination
                currentPage={page}
                pageSize={pageSize}
                onChange={onPaginationChange}
                total={products?.total ?? 0}
              />
            </Flex>
          ))
          .exhaustive()}
      </>
    </>
  );
};

export { ProductListWidget };
