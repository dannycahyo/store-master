import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import type { CartProduct } from "@src/models";
import type React from "react";

type CartProductTableProps = {
  products: CartProduct[];
};

const CartProductTable: React.FC<CartProductTableProps> = ({ products }) => {
  return (
    <TableContainer borderWidth="1px" borderColor="gray.100">
      <Table variant="simple">
        <TableCaption>Product List</TableCaption>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Discount Percentage</Th>
            <Th isNumeric>Quantity</Th>
            <Th isNumeric>Total</Th>
            <Th isNumeric>Discounted Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(
            ({
              id,
              title,
              price,
              discountPercentage,
              quantity,
              total,
              discountedPrice,
            }) => (
              <Tr key={id}>
                <Td>{title}</Td>
                <Td isNumeric>{price}</Td>
                <Td isNumeric>{discountPercentage}</Td>
                <Td isNumeric>{quantity}</Td>
                <Td isNumeric>{total}</Td>
                <Td isNumeric>{discountedPrice}</Td>
              </Tr>
            ),
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { CartProductTable };
