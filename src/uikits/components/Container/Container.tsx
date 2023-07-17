import Link from "next/link";
import {
  Grid,
  GridItem,
  Container as ChakraContainer,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { match } from "ts-pattern";
import { HamburgerIcon } from "@chakra-ui/icons";
import { menuItems } from "@src/constants";

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
          {match(isBelowTabletSize)
            .with(true, () => null)
            .with(false, () => <GridItem colSpan={1}>{sidebar}</GridItem>)
            .exhaustive()}
          <GridItem
            colSpan={{ base: 5, md: 5, lg: 4 }}
            pr={4}
            pl={{ base: 4, lg: 0 }}
            py={8}
          >
            {match(isBelowTabletSize)
              .with(true, () => (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                    mb={4}
                  />
                  <MenuList>
                    {menuItems.map((menuItem) => (
                      <MenuItem key={menuItem}>
                        <Link href={`/${menuItem.toLowerCase()}`}>
                          {menuItem}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              ))
              .with(false, () => null)
              .exhaustive()}
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
