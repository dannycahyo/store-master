import { Box, Flex, Text, IconButton, Select } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import type React from "react";

type PaginationProps = {
  currentPage: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  total,
  onChange,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  const handlePrev = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1, pageSize);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onChange(currentPage + 1, pageSize);
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newPageSize = parseInt(event.target.value);
    onChange(1, newPageSize);
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="center"
      py={2}
      gap={4}
      role="navigation"
    >
      <Box>
        <IconButton
          aria-label="Previous Page"
          icon={<ChevronLeftIcon />}
          colorScheme="purple"
          isDisabled={currentPage === 1}
          onClick={handlePrev}
        />
      </Box>

      <Box role="list">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Box
            role="listitem"
            aria-label={`Page ${page}`}
            key={page}
            display="inline-block"
            px={{ base: 2, md: 4 }}
            py={{ base: 1, md: 2 }}
            rounded="lg"
            bg={currentPage === page ? "purple.500" : "white"}
            color={currentPage === page ? "white" : "black"}
            cursor="pointer"
            onClick={() => onChange(page, pageSize)}
          >
            <Text>{page}</Text>
          </Box>
        ))}
      </Box>

      <Box>
        <Select
          value={pageSize}
          onChange={handlePageSizeChange}
          width={{ base: "100%", md: "auto" }}
          variant="outline"
          borderColor="gray.400"
          aria-label="Page size selector"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </Select>
      </Box>

      <Box>
        <IconButton
          aria-label="Next Page"
          icon={<ChevronRightIcon />}
          colorScheme="purple"
          isDisabled={currentPage === totalPages}
          onClick={handleNext}
        />
      </Box>
    </Flex>
  );
};

export { Pagination };
