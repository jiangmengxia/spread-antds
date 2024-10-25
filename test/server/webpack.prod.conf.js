/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-23 16:46:51
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-24 12:34:38
 * @FilePath: \bspt-dqy-spreadjs-front\build\webpack.prod.conf.js
 * @Description: Description
 */
const commonConfig = require('./webpack.common.conf');
const merge = require('webpack-merge');

const buildConfig = {};
module.exports = merge(commonConfig, buildConfig);
