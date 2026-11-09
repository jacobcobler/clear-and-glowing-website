/** @type {import("prettier").Config} */
export default {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,        // Enforces the 2-unit standard amount
  useTabs: false,     // Set to true if you prefer tabs over spaces
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: ['**/*.astro'],
      options: {
        parser: 'astro',
      },
    },
  ],
};
