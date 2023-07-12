import { Grid, GridItem } from "@chakra-ui/react";

import type React from "react";

type ContainerProps = {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ sidebar, children }) => {
  return (
    <Grid minH="100vh" templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem
        colSpan={{ base: 0, md: 1 }}
        display={{ base: "none", md: "block" }}
      >
        {sidebar !== undefined ? sidebar : null}
      </GridItem>
      <GridItem colSpan={{ base: 5, md: 4 }}>{children}</GridItem>
    </Grid>
  );
};

export { Container };
