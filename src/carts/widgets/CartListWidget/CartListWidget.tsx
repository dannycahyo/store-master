import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { VStack, Flex, Box, Heading, Divider } from "@chakra-ui/react";
import { match } from "ts-pattern";

import { useGetAllCarts } from "@src/carts/services";
import { GeneralError, Pagination, TableSkeleton } from "@src/uikits";
import { CartTable } from "@src/carts/components";
import { getQuery } from "@src/utils";

import type React from "react";

type Pagination = {
  page: number;
  pageSize: number;
};

const CartListWidget: React.FC = () => {
  const router = useRouter();

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 5,
  });

  const { page, pageSize } = pagination;

  const { data: cartData, status: cartsStatus } = useGetAllCarts({
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, page, pageSize }));

    router.push(
      {
        pathname: router.pathname,
        query: {
          page: page,
          pageSize: pageSize,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    const { page: pageQuery, pageSize: pageSizeQuery } = router.query;

    setPagination({
      page: Number(getQuery<number>(pageQuery, 1)),
      pageSize: Number(getQuery<number>(pageSizeQuery, 5)),
    });
  }, [router.query]);

  return (
    <>
      {match(cartsStatus)
        .with("loading", () => <TableSkeleton />)
        .with("error", () => (
          <GeneralError
            title="Cart List Error!"
            description="There was something wrong when fetching cart list."
          />
        ))
        .with("success", () => (
          <VStack spacing={10}>
            <Box w="full">
              <Heading size="md" mb={4} fontWeight="semibold">
                Cart List
              </Heading>
              <Divider
                width={{ base: "30%", md: "15%", xl: "10%" }}
                mb={4}
                borderWidth="2px"
                borderColor="purple.200"
              />
              <CartTable carts={cartData?.carts ?? []} />
            </Box>
            <Flex alignSelf={{ base: "center", md: "flex-end" }}>
              <Pagination
                currentPage={page}
                onChange={handlePaginationChange}
                pageSize={pageSize}
                total={cartData?.total ?? 0}
              />
            </Flex>
          </VStack>
        ))
        .exhaustive()}
    </>
  );
};

export { CartListWidget };
