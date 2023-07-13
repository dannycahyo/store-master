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

import type { Product } from "@src/models";
import type React from "react";

type ProductTableProps = {
  products: Product[];
};

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <TableContainer borderWidth="1px" borderColor="gray.100">
      <Table variant="simple">
        <TableCaption>Product List</TableCaption>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Brand</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Stock</Th>
            <Th>Category</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(({ id, title, brand, price, category, stock }) => (
            <Tr key={id}>
              <Td>{title}</Td>
              <Td>{brand}</Td>
              <Td isNumeric>{price}</Td>
              <Td isNumeric>{stock}</Td>
              <Td>{category}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { ProductTable };
