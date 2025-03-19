import type { StorybookConfig } from '@storybook/nextjs';
import "../src/styles/globals.css"

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  }
};
export default config;