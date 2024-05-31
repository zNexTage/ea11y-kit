/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic'
        }
      }
    }
  }),
  docs: {
    autodocs: "tag",
  },

  // Adiciona uma regra para lidar com arquivos .vtt
  webpackFinal: async (config, { configType }) => {
    // Adiciona a regra apenas para arquivos .vtt
    config.module.rules.push({
      test: /\.vtt$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]', // mantém o nome do arquivo original
            outputPath: 'assets/', // opcional: especifica o diretório de saída
          },
        },
      ],
    });

    return config;
  },
};

export default config;