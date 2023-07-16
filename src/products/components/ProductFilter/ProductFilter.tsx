import { useState } from "react";
import {
  Flex,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  VStack,
  InputLeftAddon,
  Box,
  Stack,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import type React from "react";
import type { ProductRequestParams } from "@src/products/model";

type ProducFilterProps = {
  brands: string[];
  categories: string[];
  formValues: Omit<ProductRequestParams, "limit" | "skip" | "select">;
  onSearch: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
};

const ProductFilter: React.FC<ProducFilterProps> = ({
  brands,
  categories,
  formValues,
  onSearch,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
}) => {
  const {
    category: selectedCategory,
    brand: selectedBrand,
    pMin: minPrice,
    pMax: maxPrice,
    q: searchProductValue,
  } = formValues;

  const [priceRange, setPriceRange] = useState<{
    min?: number;
    max?: number;
  }>({
    min: minPrice,
    max: maxPrice,
  });

  const isNotValidPriceRange = (priceRange.min ?? 0) >= (priceRange.max ?? 0);

  return (
    <Stack direction={{ base: "column", md: "row" }} spacing="12px" w="full">
      <Box w={{ base: "full", md: "30%" }}>
        <VStack align="flex-start" spacing="4">
          <Text>Category</Text>
          <Select
            placeholder="Filter By Category"
            aria-label="Categories Filter"
            onChange={(e) => {
              onCategoryChange(e.target.value);
            }}
            value={selectedCategory ?? ""}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </VStack>
      </Box>
      <Box w={{ base: "full", md: "30%" }}>
        <VStack align="flex-start" spacing="4">
          <Text>Brand</Text>
          <Select
            placeholder="Filter By Brand"
            aria-label="Brands Filter"
            onChange={(e) => {
              onBrandChange(e.target.value);
            }}
            value={selectedBrand ?? ""}
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Select>
        </VStack>
      </Box>
      <Box w={{ base: "full", md: "40%" }}>
        <VStack align="flex-start" spacing="4">
          <HStack spacing={4}>
            <Text>Price Range</Text>
            <Button
              colorScheme="purple"
              size="xs"
              _disabled={{
                opacity: 0.5,
                cursor: "not-allowed",
              }}
              isDisabled={isNotValidPriceRange}
              onClick={() => {
                if (isNotValidPriceRange) {
                  return;
                }
                onPriceRangeChange(priceRange.min ?? 0, priceRange.max ?? 0);
              }}
            >
              Apply Price Range
            </Button>
          </HStack>
          <HStack>
            <InputGroup>
              <InputLeftAddon>$</InputLeftAddon>
              <Input
                placeholder="Min"
                aria-label="Min Price"
                value={priceRange.min}
                onChange={(e) => {
                  setPriceRange((prev) => ({
                    ...prev,
                    min: Number(e.target.value),
                  }));
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>$</InputLeftAddon>
              <Input
                placeholder="Max"
                aria-label="Max Price"
                value={priceRange.max}
                onChange={(e) => {
                  setPriceRange((prev) => ({
                    ...prev,
                    max: Number(e.target.value),
                  }));
                }}
              />
            </InputGroup>
          </HStack>
        </VStack>
      </Box>
      <Spacer />
      <Flex
        alignSelf={{ base: "flex-start", md: "flex-end" }}
        w={{ base: "full", md: "auto" }}
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search product"
            aria-label="Search product"
            value={searchProductValue}
            onChange={(e) => {
              onSearch(e.target.value);
            }}
          />
        </InputGroup>
      </Flex>
    </Stack>
  );
};

export { ProductFilter };
