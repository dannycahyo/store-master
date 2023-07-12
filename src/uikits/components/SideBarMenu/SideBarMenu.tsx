import { useState } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

import type { ReactNode } from "react";
import type React from "react";

type MenuItemProps = {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ children, isActive, onClick }) => (
  <Box
    cursor="pointer"
    py={2}
    px={4}
    bg={isActive ? "blue.200" : "transparent"}
    _hover={{ bg: "blue.200" }}
    w="full"
    onClick={onClick}
  >
    <Text fontWeight={isActive ? "bold" : "normal"}>{children}</Text>
  </Box>
);

type SideBarMenuProps = {
  onSelect: (selectedItem: string) => void;
  menuItems: string[];
};

const SideBarMenu: React.FC<SideBarMenuProps> = ({ menuItems, onSelect }) => {
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenu(menuItem);
    onSelect(menuItem);
  };

  return (
    <VStack spacing={1} align="start" bg="purple.500" color="white" h="full">
      <Heading size={{ md: "sm", lg: "md" }} py="2" px="4">
        Store Master
      </Heading>
      {menuItems.map((menuItem) => (
        <MenuItem
          key={menuItem}
          isActive={selectedMenu === menuItem}
          onClick={() => handleMenuItemClick(menuItem)}
        >
          {menuItem}
        </MenuItem>
      ))}
    </VStack>
  );
};

export { SideBarMenu };
