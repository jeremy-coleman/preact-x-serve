module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser:  "@typescript-eslint/parser",
  env: {
    "browser": true,
    "node": true,
    "es6": true
  },
  plugins: ["eslint-plugin", "@typescript-eslint", "react"],
  settings: {
    "import/extensions": [".js", ".ts", ".tsx", ".jsx", ".mjs", ".json"],
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".tsx", ".jsx", ".mjs", ".json"],
      },
    react: {
      pragma: "h",
      version: "preact"
    }
  },
  project: "./tsconfig.json",
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    },
    "useJSXTextNode": true,
    "tsconfigRootDir": "./src",
    "extraFileExtensions": [".vue"]
  },
  rules: {
    "import/no-mutable-exports": "off",
    "import/prefer-default-export": "off",
    "lines-between-class-members": "off",
    "no-await-in-loop": "off",
    "no-restricted-globals": "off",
    "no-bitwise": "off",
    "no-console": 1,
    "no-empty": 0,
    "semi": 2,
    "keyword-spacing": 2,
    "react/no-string-refs": 2,
    "react/no-find-dom-node": 2,
    "react/no-is-mounted": 2,
    "react/jsx-no-comment-textnodes": 2,
    "react/jsx-curly-spacing": 2,
    "react/jsx-no-undef": 2,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "prefer-destructuring": "off",
    "prettier/prettier": "error",
    "strict": "off",
    // False positive on TS constructors with initializers.
    "no-useless-constructor": "off"
  }
}
}


//reference https://github.com/typescript-eslint/typescript-eslint/blob/master/.eslintrc.json
//https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser
