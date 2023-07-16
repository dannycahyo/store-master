import {
  Grid,
  GridItem,
  Container as ChakraContainer,
  useMediaQuery,
} from "@chakra-ui/react";

import type React from "react";

type ContainerProps = {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ sidebar, children }) => {
  const [isBelowTabletSize] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {sidebar !== undefined ? (
        <Grid minH="100vh" templateColumns="repeat(5, 1fr)" gap={4}>
          {isBelowTabletSize ? null : (
            <GridItem colSpan={1}>{sidebar}</GridItem>
          )}
          <GridItem
            colSpan={{ base: 5, md: 5, lg: 4 }}
            pr={4}
            pl={{ base: 4, lg: 0 }}
            py={8}
          >
            {children}
          </GridItem>
        </Grid>
      ) : (
        <ChakraContainer centerContent h="100vh" maxW="6xl">
          {children}
        </ChakraContainer>
      )}
    </>
  );
};

export { Container };
