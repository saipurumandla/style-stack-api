import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
      parserOptions: {
        ecmaVersion: 2021, // or other version as needed
      },
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Disable single quote enforcement
      quotes: "off",

      // Prettier rules
      "prettier/prettier": "error",

      // Possible Errors
      // "no-console": "warn",
      "no-debugger": "error",
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty": "error",
      "no-ex-assign": "error",
      "no-extra-boolean-cast": "error",
      "no-extra-semi": "error",
      "no-func-assign": "error",
      "no-inner-declarations": "error",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": "error",
      "no-obj-calls": "error",
      "no-sparse-arrays": "error",
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
      "use-isnan": "error",
      "valid-typeof": "error",

      // Best Practices
      curly: "error",
      eqeqeq: ["error", "always"],
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-multi-spaces": "error",
      "no-redeclare": "error",
      "no-return-assign": ["error", "always"],
      "no-self-assign": "error",
      "no-unused-labels": "error",
      "no-useless-catch": "error",
      "no-useless-escape": "error",
      "no-with": "error",
      yoda: ["error", "never"],

      // Variables
      "no-delete-var": "error",
      "no-undef": "error",
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_$", // Ignore variables named '_'
          argsIgnorePattern: "^_$", // Ignore function arguments named '_'
        },
      ],
      "no-use-before-define": [
        "error",
        { functions: false, classes: true, variables: true },
      ],
    },
  },
];
