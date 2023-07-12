import { Meta, StoryFn } from "@storybook/react";
import { Box } from "@chakra-ui/react";

import { Container } from "./Container";
import { SideBarMenu } from "../SideBarMenu";

export default {
  title: "UI Kits/Components/Container",
  component: Container,
} as Meta<typeof Container>;

const Template: StoryFn<typeof Container> = (args) => <Container {...args} />;

export const Default = Template.bind({});
Default.args = {
  sidebar: (
    <SideBarMenu
      menuItems={["Menu 1", "Menu 2", "Menu 3"]}
      onSelect={(selectedItem: string) => console.log(selectedItem)}
    />
  ),
  children: <Box bg="purple.100" h="full" />,
};
