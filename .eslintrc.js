module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'jsx-a11y',
    'import',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '(React)|(css)|(jsx)' }],
    'max-len': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'react/prop-types': 'off',
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
