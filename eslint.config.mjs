import bpmnIoPlugin from "eslint-plugin-bpmn-io";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**"],
  },
  ...bpmnIoPlugin.configs.recommended,
  {
    files: ["test/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...bpmnIoPlugin.configs.mocha.map((config) => ({
    ...config,
    files: ["test/**/*.js"],
  })),
  eslintConfigPrettier,
];
