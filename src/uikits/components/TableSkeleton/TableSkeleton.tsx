import { Skeleton, Stack } from "@chakra-ui/react";

import type React from "react";

const TableSkeleton: React.FC = () => {
  return (
    <Stack role="progressbar" w="full">
      <Skeleton startColor="purple.500" endColor="blue.500" height={20} />
      <Skeleton startColor="purple.500" endColor="blue.500" height={20} />
      <Skeleton startColor="purple.500" endColor="blue.500" height={20} />
    </Stack>
  );
};

export { TableSkeleton };
