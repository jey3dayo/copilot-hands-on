module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:prettier/recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "settings": {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs', '.mts'] }
    }
  },
  "rules": {
    "@typescript-eslint/no-implied-eval": "error",
    "class-methods-use-this": 0,
    "global-require": 0,
    "no-await-in-loop": 0,
    "no-console": 0,
    "no-param-reassign": 0,
    "no-plusplus": 0,
    "no-restricted-syntax": 0,
    "no-underscore-dangle": 0,
    "import/no-relative-packages": 0,
    "import/no-dynamic-require": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
        "optionalDependencies": true
      }
    ],
    "import/extensions": ["error", "always", {
      js: "never",
      mjs: "never",
    }],
    "import/no-unresolved": [
      "error",
      {
        "ignore": [
          "\\.mjs$"
        ]
      }
    ],
    "prettier/prettier": [
        "error",
        {
          "printWidth": 120,
          "singleQuote": true,
          "trailingComma": "all",
          "arrowParens": "avoid"
        }
    ]
  }
}
