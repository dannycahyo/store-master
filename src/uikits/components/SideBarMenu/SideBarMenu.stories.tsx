import { Meta, StoryFn } from "@storybook/react";
import { Box } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/client-api";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { menuItemsDummy } from "@src/constants";
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
  menuItems: menuItemsDummy,
};

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  menuItemsDummy.forEach((menuItem) => {
    const menuItemText = canvas.getByText(menuItem);
    expect(menuItemText).toBeInTheDocument();
  });

  for (const menuItem of menuItemsDummy) {
    await step(`user click the ${menuItem} menu item`, async () => {
      const menuItemText = canvas.getByRole("menuitem", {
        name: menuItem,
      });
      userEvent.click(menuItemText);

      const activeMenuItemStyle = "font-weight: 400";

      waitFor(() => {
        expect(menuItemText).toHaveStyle(activeMenuItemStyle);
      });
    });
  }
};
