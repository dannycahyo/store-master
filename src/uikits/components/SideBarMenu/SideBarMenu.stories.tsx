import { Meta, StoryFn } from "@storybook/react";
import { Box } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/client-api";

import { SideBarMenu } from "./SideBarMenu";

export default {
  title: "UI Kits/Components/SideBarMenu",
  component: SideBarMenu,
} as Meta<typeof SideBarMenu>;

const Template: StoryFn<typeof SideBarMenu> = (args) => {
  const argsState = useArgs();
  const updateArgs = argsState[1];

  const handleSelect = (menuItem: string) => {
    action("onSelect")(menuItem);
    updateArgs({ selectedItem: menuItem });
  };

  return (
    <Box maxW="44" h="100vh">
      <SideBarMenu {...args} onSelect={handleSelect} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  menuItems: ["Menu 1", "Menu 2", "Menu 3"],
};
