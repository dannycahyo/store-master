import { Grid, GridItem, Container as ChakraContainer } from "@chakra-ui/react";

import type React from "react";

type ContainerProps = {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ sidebar, children }) => {
  return (
    <>
      {sidebar !== undefined ? (
        <Grid minH="100vh" templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem
            colSpan={{ base: 0, md: 1 }}
            display={{ base: "none", md: "block" }}
          >
            {sidebar}
          </GridItem>
          <GridItem colSpan={{ base: 5, md: 4 }}>{children}</GridItem>
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
