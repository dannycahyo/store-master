import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Story />
          </ChakraProvider>
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;
