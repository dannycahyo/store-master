import { Meta, StoryFn } from "@storybook/react";
import { PieChart } from "./PieChart";
import { productListMapped } from "@src/constants";
import { Container } from "@chakra-ui/react";

export default {
  title: "UI Kits/Components/PieChart",
  component: PieChart,
} as Meta<typeof PieChart>;

const Template: StoryFn<typeof PieChart> = (args) => (
  <Container maxW="xl" centerContent>
    <PieChart {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  data: productListMapped.map((product) => ({
    label: product.title,
    total: product.stock,
  })),
};
