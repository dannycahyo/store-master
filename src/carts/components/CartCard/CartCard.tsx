import { Flex, HStack, Text, VStack } from "@chakra-ui/react";

import type React from "react";
import type { Cart } from "@src/carts/model";

type CartProps = {
  cartDetail: Cart;
};

const CartCard: React.FC<CartProps> = ({ cartDetail }) => {
  const { total, discountedTotal, userId, totalProducts, totalQuantity } =
    cartDetail;

  return (
    <VStack
      p={4}
      gap={2}
      bg="purple.50"
      borderRadius="lg"
      align="start"
      maxW="lg"
      alignItems="stretch"
      role="figure"
    >
      <Flex justifyContent="space-between">
        <HStack>
          <Text fontSize={{ base: "sm", md: "md" }} fontWeight="semibold">
            User ID:
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{userId}</Text>
        </HStack>
        <HStack>
          <Text fontSize={{ base: "sm", md: "md" }} fontWeight="semibold">
            Discounted Total:
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{discountedTotal}</Text>
        </HStack>
      </Flex>

      <Flex justifyContent="space-between">
        <HStack>
          <Text fontWeight="semibold" fontSize={{ base: "sm", md: "md" }}>
            Total:
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{total}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="semibold" fontSize={{ base: "sm", md: "md" }}>
            Total Products:
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{totalProducts}</Text>
        </HStack>
      </Flex>

      <HStack>
        <Text fontSize={{ base: "sm", md: "md" }} fontWeight="semibold">
          Total Quantity:
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }}>{totalQuantity}</Text>
      </HStack>
    </VStack>
  );
};

export { CartCard };
