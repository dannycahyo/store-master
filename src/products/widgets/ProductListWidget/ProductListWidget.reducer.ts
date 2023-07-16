import { useReducer } from "react";

type Pagination = {
  page: number;
  pageSize: number;
};

type CategoryBrandFilter = {
  categoryName?: string;
  brandName?: string;
};

type State = {
  pagination: Pagination;
  filter: CategoryBrandFilter;
  search?: string;
  priceRange: [number | undefined, number | undefined];
};

type Action =
  | { type: "SET_PAGINATION"; payload: Pagination }
  | { type: "SET_FILTER"; payload: CategoryBrandFilter }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_PRICE_RANGE"; payload: [number, number] };

function productListWidgetReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PAGINATION":
      return { ...state, pagination: action.payload };
    case "SET_FILTER":
      return {
        ...state,
        pagination: { ...state.pagination, page: 1 },
        filter: action.payload,
      };
    case "SET_SEARCH":
      return {
        ...state,
        pagination: { ...state.pagination },
        search: action.payload,
      };
    case "SET_PRICE_RANGE":
      return {
        ...state,
        pagination: { ...state.pagination, page: 1 },
        priceRange: action.payload,
      };
    default:
      return state;
  }
}

function useProductListWidgetReducer() {
  const [state, dispatch] = useReducer(productListWidgetReducer, {
    pagination: { page: 1, pageSize: 10 },
    filter: { categoryName: undefined, brandName: undefined },
    search: undefined,
    priceRange: [undefined, undefined],
  });

  return { state, dispatch };
}

export { useProductListWidgetReducer };
