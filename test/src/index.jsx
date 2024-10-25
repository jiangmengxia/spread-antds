/*
 * @Description:
 * @Author: liyue
 * @Email: liyue@nnuo.com
 * @Date: 2022-05-12 09:32:14
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-25 17:07:16
 * @FilePath: \spread-antds\test\src\index.jsx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, Empty } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import App from './App';

ReactDOM.render(
  <ConfigProvider
    locale={zhCN}
    prefixCls="cmp"
    renderEmpty={(componentName) => {
      if (componentName === 'Table') {
        return (
          <div className="table-empty-wrap">
            <div className="empty-tip">暂无数据</div>
          </div>
        );
      }
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }}
  >
    <App />
  </ConfigProvider>,
  document.getElementById('root') || document.createElement('div'),
);
