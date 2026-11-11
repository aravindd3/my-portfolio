import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated Astryx theme artifacts:
    "src/astryx-themes.ts",
    "src/themes/datasheet/datasheet.js",
    "src/themes/datasheet/datasheet.d.ts",
    "src/themes/datasheet/datasheet.css.d.ts",
    "src/themes/datasheet/datasheet.variants.d.ts",
  ]),
  {
    files: ["src/themes/**/*.doc.mjs"],
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  },
]);

export default eslintConfig;
