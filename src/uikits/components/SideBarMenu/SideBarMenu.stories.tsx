import { Meta, StoryFn } from "@storybook/react";
import { Box } from "@chakra-ui/react";

import { SideBarMenu } from "./SideBarMenu";

export default {
  title: "UI Kits/Components/SideBarMenu",
  component: SideBarMenu,
} as Meta<typeof SideBarMenu>;

const Template: StoryFn<typeof SideBarMenu> = (args) => (
  <Box maxW="44" h="100vh">
    <SideBarMenu {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  menuItems: ["Menu 1", "Menu 2", "Menu 3"],
  onSelect: (selectedItem: string) => console.log(selectedItem),
};
