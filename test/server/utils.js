/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-25 15:15:22
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-25 17:47:56
 * @FilePath: \spread-antds\test\server\utils.js
 * @Description: Description
 */
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd()); // appDirectory 指的是项目根路径
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const resolveAppSrc = (relativePath) => path.resolve(appDirectory, 'test/src', relativePath);

const cssLoaderConfig = {
  loader: 'css-loader',
  options: {
    modules: true, // 启用 CSS 模块，否则import styles from ... //读出来的styles为空，style.classname会报错
    importLoaders: 0,
    import: true, // 选项用于控制是否启用 CSS 文件中的 @import 规则。
    url: true,
    esModule: true,
  },
};
const lessLoaderConfig = {
  loader: 'less-loader', // compiles Less to CSS
  options: {
    lessOptions: {
      modifyVars: {
        'ant-prefix': 'cmp',
        // 全局主色
        'primary-color': '#0077FF',
        black: '#222222',
        'main-color': '#333',
        // 正文字
        'content-color': '#444444',
        'label-color': '#666666',
        // form label
        // 链接色
        'link-color': '#0077FF',
        'link-hover-color': '#3392FF',
        'link-active-color': '#005FCC',
        // 成功色
        'success-color': '#13CE66',
        // 警告色
        'warning-color': '#F7BA2A',
        // 错误色
        'error-color': '#FF4949',
        // 字体
        'font-family':
          '"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif',
        // 主字号
        'font-size-base': '12px',
        'font-weight-base': 600,
        // 组件/浮层圆角
        'border-radius-base': '2px',
        'border-color-base': '#E5E5E5',
        'table-padding-horizontal': '12px',
        'tabs-horizontal-margin': '0 20px 0 0',
        'tabs-horizontal-padding-lg': '16px 20px',
        // 菜单
        'menu-item-font-size': '13px',
        'menu-item-height': '41px',
        // Modal
        'modal-header-padding-vertical': '18px',
        'modal-header-padding-horizontal': '24px',
        'modal-title-font-weight': 500,
        'modal-footer-padding-vertical': '14px',
        'modal-footer-padding-horizontal': '24px',
        // btn
        'btn-disable-color': '#C7CBD5',
        'btn-disable-bg': '#F4F8FD',
        'btn-disable-border': '#DBDEE6',
        // form
        'form-label-total-width': '116px',
        // 包括：width 100 + 左边距 8 + 右8
        'search-form-padding': '24px 12px 4px',
        'search-form-btns': '0 8px 20px 0',
        'input-placeholder-color': '#BFBFBF',

        // hack: `true; @import "/src/theme/color.less";`, // Override with less file
      },
      // 在 less-loader 的配置中，javascriptEnabled 是一个选项，用于控制是否启用 JavaScript 在 Less 文件中的使用。
      // 默认情况下，javascriptEnabled 是 false，表示禁用 JavaScript。
      javascriptEnabled: true,
      // relativeUrls: false, // 解决less中@import路径问题
      sourceMap: true, // 是否使用sourceMap
      // strictMath 是一个 Less 预处理器选项，用于控制 Less 中数学运算的行为。
      // 默认情况下，strictMath 是 false，表示使用宽松的数学运算。
      // strictMath: true,
    },
  },
};
module.exports = {
  resolveApp,
  resolveAppSrc,
  resolve: path.resolve,
  cssLoaderConfig,
  lessLoaderConfig,
};
