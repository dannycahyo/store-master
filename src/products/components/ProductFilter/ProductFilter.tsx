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

type ProducFilterProps = {
  brands: string[];
  categories: string[];
  onSearch: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
};

const ProductFilter: React.FC<ProducFilterProps> = ({
  brands,
  categories,
  onSearch,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
}) => {
  const [priceRange, setPriceRange] = useState<{
    min: number;
    max: number;
  }>({
    min: 0,
    max: 0,
  });

  const isNotValidPriceRange = priceRange.min >= priceRange.max;

  const disabledButtonStyle = {
    opacity: 0.5,
    cursor: "not-allowed",
  };

  return (
    <Stack direction={{ base: "column", md: "row" }} spacing="12px" w="full">
      <Box w={{ base: "full", md: "30%" }}>
        <VStack align="flex-start" spacing="4">
          <Text>Category</Text>
          <Select
            placeholder="Filter By Category"
            onChange={(e) => {
              onCategoryChange(e.target.value);
            }}
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
            onChange={(e) => {
              onBrandChange(e.target.value);
            }}
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
              sx={isNotValidPriceRange ? disabledButtonStyle : undefined}
              disabled={isNotValidPriceRange}
              onClick={() => {
                if (isNotValidPriceRange) {
                  return;
                }
                onPriceRangeChange(priceRange.min, priceRange.max);
              }}
            >
              Apply Price Range
            </Button>
          </HStack>
          <HStack>
            <InputGroup>
              <InputLeftAddon>$</InputLeftAddon>
              <Input
                type="number"
                placeholder="Min"
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
                type="number"
                placeholder="Max"
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
