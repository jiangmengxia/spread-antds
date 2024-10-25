/*
 * @Author: zhoujianfei
 * @Email: zhoujianfei@nnuo.com
 * @Date: 2021-06-08 14:27:18
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-25 16:55:41
 */
import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import router from '@router';
import Loading from 'antd/lib/spin';

function App() {
  return (
    <HashRouter basename="/">
      <Suspense fallback={<Loading />}>
        <Switch>
          {router.map(({ key, loader, path, ...rest }) => (
            <Route component={lazy(loader)} key={path} path={path} {...rest} />
          ))}
          <Redirect exact path="/" to="/selector" />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}

export default App;
