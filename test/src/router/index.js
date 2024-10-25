/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-25 15:16:23
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-25 17:01:20
 * @FilePath: \spread-antds\test\src\router\index.js
 * @Description: Description
 */

export default [
  {
    key: 'spread-selector',
    loader: () => import('@pages/Selector'),
    path: '/selector',
  },
  {
    key: 'spread-timepicker',
    loader: () => import('@pages/TimePicker'),
    path: '/timepicker',
  },
];
