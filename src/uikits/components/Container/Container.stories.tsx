import { Meta, StoryFn } from "@storybook/react";
import { Box } from "@chakra-ui/react";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { menuItemsDummy } from "@src/constants";
import { Container } from "./Container";
import { SideBarMenu } from "../SideBarMenu";

export default {
  title: "UI Kits/Components/Container",
  component: Container,
} as Meta<typeof Container>;

const Template: StoryFn<typeof Container> = (args) => <Container {...args} />;

export const ContainerWithSideBar = Template.bind({});
ContainerWithSideBar.args = {
  sidebar: (
    <SideBarMenu
      menuItems={menuItemsDummy}
      onSelect={(selectedItem: string) => console.log(selectedItem)}
    />
  ),
  children: <Box bg="purple.100" h="full" />,
};

export const ContainerWithoutSideBar = Template.bind({});
ContainerWithoutSideBar.args = {
  children: <Box h="full" w="full" bg="purple.100" />,
};

export const ContainerWithSideBarMobileView = Template.bind({});
ContainerWithSideBarMobileView.args = {
  sidebar: (
    <SideBarMenu
      menuItems={menuItemsDummy}
      onSelect={(selectedItem: string) => console.log(selectedItem)}
    />
  ),
  children: <Box bg="purple.100" h="full" />,
};

ContainerWithSideBarMobileView.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};

ContainerWithSideBar.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  menuItemsDummy.forEach((menuItem) => {
    const menuItemText = canvas.getByText(menuItem);
    expect(menuItemText).toBeInTheDocument();
  });
};

ContainerWithoutSideBar.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  menuItemsDummy.forEach((menuItem) => {
    const menuItemText = canvas.queryByText(menuItem);
    expect(menuItemText).toBeNull();
  });
};

ContainerWithSideBarMobileView.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Add a delay of 500ms to wait the component to be rendered on the mobile viewport
  await new Promise((resolve) => setTimeout(resolve, 500));

  menuItemsDummy.forEach((menuItem) => {
    const menuItemText = canvas.queryByText(menuItem);
    expect(menuItemText).toBeNull();
  });
};
