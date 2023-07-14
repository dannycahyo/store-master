import { Box, SkeletonText } from "@chakra-ui/react";

import type React from "react";

const CardSkeleton: React.FC = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="purple.100">
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export { CardSkeleton };
