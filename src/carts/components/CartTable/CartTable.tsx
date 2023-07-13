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

import type { Cart } from "@src/models/Cart";
import type React from "react";

type ProductTableProps = {
  carts: Cart[];
};

const CartTable: React.FC<ProductTableProps> = ({ carts }) => {
  return (
    <TableContainer borderWidth="1px" borderColor="gray.100">
      <Table variant="simple">
        <TableCaption>Cart List</TableCaption>
        <Thead>
          <Tr>
            <Th isNumeric>User ID</Th>
            <Th isNumeric>Total Quantity</Th>
            <Th isNumeric>Total Products</Th>
            <Th isNumeric>Total</Th>
            <Th isNumeric>Discounted Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {carts.map(
            ({
              id,
              userId,
              total,
              totalProducts,
              discountedTotal,
              totalQuantity,
            }) => (
              <Tr key={id}>
                <Td isNumeric>{userId}</Td>
                <Td isNumeric>{totalQuantity}</Td>
                <Td isNumeric>{totalProducts}</Td>
                <Td isNumeric>{total}</Td>
                <Td isNumeric>{discountedTotal}</Td>
              </Tr>
            ),
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { CartTable };
