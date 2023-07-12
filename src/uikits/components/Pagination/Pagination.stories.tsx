import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withActions } from "@storybook/addon-actions/decorator";
import { useArgs } from "@storybook/client-api";

import { Pagination } from "./Pagination";

export default {
  title: "UI Kits/Components/Pagination",
  component: Pagination,
  decorators: [withActions],
} as Meta<typeof Pagination>;

const Template: StoryFn<typeof Pagination> = (args) => {
  const [{ currentPage, pageSize }, updateArgs] = useArgs();

  const handleChange = (newPage: number, newPageSize: number) => {
    action("onChange")(newPage, newPageSize);
    updateArgs({ currentPage: newPage, pageSize: newPageSize });
  };

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      pageSize={pageSize}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  currentPage: 1,
  pageSize: 10,
  total: 100,
};
