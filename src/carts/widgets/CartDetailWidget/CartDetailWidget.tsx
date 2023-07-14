import { Box, Heading, VStack } from "@chakra-ui/react";
import { match } from "ts-pattern";

import { useGetCartDetail } from "@src/carts/services";
import { CartCard, CartProductTable } from "@src/carts/components";
import { CardSkeleton, GeneralError, TableSkeleton } from "@src/uikits";

import type React from "react";
import type { Cart } from "@src/carts/model";

type CartDetailWidgetProps = {
  cartId: string;
};

const CartDetailWidget: React.FC<CartDetailWidgetProps> = ({ cartId }) => {
  const { data: cartDetailData, status } = useGetCartDetail({ cartId });

  const cartDetailDefaultValue: Cart = {
    id: 1,
    totalProducts: 0,
    userId: 0,
    products: [],
    discountedTotal: 0,
    total: 0,
    totalQuantity: 0,
  };

  const cartDetail = cartDetailData ?? cartDetailDefaultValue;

  return (
    <>
      {match(status)
        .with("loading", () => (
          <VStack spacing={10} align="flex-start">
            <CardSkeleton />
            <TableSkeleton />
          </VStack>
        ))
        .with("error", () => (
          <GeneralError
            title="Cart Detail Error!"
            description="There was something wrong when fetching cart detail."
          />
        ))
        .with("success", () => (
          <Box>
            <Heading size="md">{`Cart ${cartDetail.id}`}</Heading>
            <Box mt="4">
              <CartCard cartDetail={cartDetail} />
            </Box>
            <Box mt="8">
              <CartProductTable products={cartDetail.products} />
            </Box>
          </Box>
        ))
        .exhaustive()}
    </>
  );
};

export { CartDetailWidget };
