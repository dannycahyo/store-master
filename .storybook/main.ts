import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-actions",
    "@storybook/test-runner",
    "@storybook/addon-viewport",
    "@storybook/addon-interactions",
    "@storybook/jest",
    "@storybook/addon-coverage",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  refs: {
    "@chakra-ui/react": {
      disable: true,
    },
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
    };
    config.resolve.plugins = [new TsconfigPathsPlugin()];

    return config;
  },
};
export default config;
