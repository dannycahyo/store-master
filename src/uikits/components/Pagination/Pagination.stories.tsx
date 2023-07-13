import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withActions } from "@storybook/addon-actions/decorator";
import { useArgs } from "@storybook/client-api";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { Pagination } from "./Pagination";
import { paginationDummy } from "@src/constants";

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
  currentPage: paginationDummy.currentPage,
  pageSize: paginationDummy.pageSize,
  total: paginationDummy.totalData,
};

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  const {
    totalData,
    pageSize,
    currentPage: dummyCurrentPage,
  } = paginationDummy;

  const totalPages = Math.ceil(totalData / pageSize);
  let currentPage = dummyCurrentPage;
  const activePageStyle =
    "background-color: rgb(128, 90, 213); color: rgb(255, 255, 255)";

  const paginationContainer = canvas.getByRole("navigation");
  expect(paginationContainer).toBeInTheDocument();

  const paginationButtons = canvas.getAllByRole("listitem");
  expect(paginationButtons).toHaveLength(totalPages);

  const currentActivePage = canvas.getByRole("listitem", {
    name: `Page ${currentPage}`,
  });
  expect(currentActivePage).toHaveStyle(activePageStyle);

  const pageSizeSelector = canvas.getByRole("combobox", {
    name: "Page size selector",
  });
  expect(pageSizeSelector).toBeInTheDocument();

  const previousButton = canvas.getByRole("button", {
    name: "Previous Page",
  });
  expect(previousButton).toBeDisabled();

  const nextButton = canvas.getByRole("button", {
    name: "Next Page",
  });
  expect(nextButton).not.toBeDisabled();

  await step("user clicks on the next button", async () => {
    userEvent.click(nextButton);

    currentPage += 1;
    const newActivePage = canvas.getByRole("listitem", {
      name: `Page ${currentPage}`,
    });

    await waitFor(() => {
      expect(newActivePage).toHaveStyle(activePageStyle);
    });
    await waitFor(() => {
      expect(previousButton).not.toBeDisabled();
    });
  });

  await step("user clicks on the previous button", async () => {
    userEvent.click(previousButton);

    currentPage -= 1;
    const newActivePage = canvas.getByRole("listitem", {
      name: `Page ${currentPage}`,
    });

    await waitFor(() => {
      expect(newActivePage).toHaveStyle(activePageStyle);
    });
    await waitFor(() => {
      expect(previousButton).toBeDisabled();
    });
  });

  const targetPage = 3;
  await step(`user clicks on page ${targetPage}`, async () => {
    const thirdPage = canvas.getByRole("listitem", {
      name: `Page ${targetPage}`,
    });
    userEvent.click(thirdPage);

    await waitFor(() => {
      expect(thirdPage).toHaveStyle(activePageStyle);
    });
  });

  const newPageSize = 20;
  await step(`user selects page size ${newPageSize}`, async () => {
    userEvent.selectOptions(pageSizeSelector, `${newPageSize}`);

    await waitFor(() => {
      expect(pageSizeSelector).toHaveValue(`${newPageSize}`);
    });

    const firstPage = canvas.getByRole("listitem", {
      name: `Page ${1}`,
    });

    await waitFor(() => {
      expect(firstPage).toHaveStyle(activePageStyle);
    });
    await waitFor(() => {
      expect(previousButton).toBeDisabled();
    });
  });

  await step("user selects back to initial page size", async () => {
    userEvent.selectOptions(pageSizeSelector, `${pageSize}`);

    await waitFor(() => {
      expect(pageSizeSelector).toHaveValue(`${pageSize}`);
    });

    const firstPage = canvas.getByRole("listitem", {
      name: `Page ${currentPage}`,
    });

    await waitFor(() => {
      expect(firstPage).toHaveStyle(activePageStyle);
    });
    await waitFor(() => {
      expect(previousButton).toBeDisabled();
    });
  });
};
