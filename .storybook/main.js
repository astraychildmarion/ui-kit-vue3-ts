const path = require("path");
const styleImport = require("vite-plugin-style-import").default;

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: "storybook-builder-vite",
  },
  async viteFinal(config) {
    const customConfig = {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
            @import "src/assets/scss/_color.scss";
            `,
          },
          less: {
            javascriptEnabled: true,
            // modifyVars: theme,
          },
        },
      },
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };

    config.plugins.push(
      styleImport({
        libs: [
          {
            libraryName: "ant-design-vue",
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/css`;
            },
          },
        ],
      })
    );
    return { ...config, ...customConfig };
  },
};
