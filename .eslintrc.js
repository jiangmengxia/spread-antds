/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-23 16:38:00
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-25 09:16:40
 * @FilePath: \bspt-dqy-spreadjs-front\.eslintrc.js
 * @Description: Description
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = {
  env: {
    browser: true,
    es6: true,
    es2021: true,
  },
  // 指定了ESLint使用的解析器，这里使用@babel/eslint-parser，它支持最新的JavaScript语法。
  parser: '@babel/eslint-parser',
  // 设置为true，表示ESLint配置文件是根配置文件，不会向上查找父目录中的配置文件。
  root: true,
  // 配置了解析器的选项，包括ECMAScript版本、源码类型、支持的ECMAScript特性等。
  parserOptions: {
    ecmaVersion: 2021, //  用于指定 ESLint 解析器解析的 ECMAScript 版本。它告诉 ESLint 解析器应该支持哪个版本的 JavaScript 语法
    sourceType: 'module', // 那么 ESLint 解析器将把源码视为模块化的 JavaScript 代码。
    /**
     * ecmaFeatures 是一个对象，用于指定解析器支持的 ECMAScript 特性。在这个例子中，我们启用了 JSX 语法和模块语法。
     * globalReturn：允许在全局作用域下使用 return 语句。
      impliedStrict：启用全局严格模式。
      jsx：启用 JSX。
      experimentalObjectRestSpread：启用对象扩展和剩余参数的实验性特性。
      decorators：启用装饰器。
      classProperties：启用类属性。
     */
    ecmaFeatures: {
      jsx: true,
      modules: true,
      impliedStrict: false, // 启用全局严格模式
    },
  },
  // 指定了使用的插件，这里使用了react插件。
  plugins: [
    'react',
    // 'jsx-a11y', 'react-hooks', 'import'
  ],
  // 指定了继承的配置，这里继承了eslint:recommended（ESLint推荐的规则）、plugin:react/recommended（React推荐的规则）。
  extends: [
    'eslint:recommended', // eslint推荐规则
    // 'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    // 'plugin:react-hooks/recommended',
    // 'plugin:import/recommended',
  ],
  rules: {
    /**********************以上来自react-a11y的rules********************** */
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    semi: ['error', 'always'],
  },
  globals: {
    isNaN: true,
    SPREAD_CELL_MAX_ROW: true,
    SPREAD_CELL_MAX_COLUMN: false,
  },
};
