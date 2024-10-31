/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-31 14:12:18
 * @LastEditors: jmx 1024775461@qq.com
 * @LastEditTime: 2024-10-31 20:55:41
 * @FilePath: /spread-antds/packages/spread-top-menu/views/ButtonMenu.tsx
 * @Description: Description
 */

import React from "react";
import { Menu } from "../Menu";
import Button, { ButtonProps } from "antd/lib/button";
import { useEffect } from "react";
import { useState } from "react";

type ButtonMenuProps = {
  menuInstance: Menu;
} & ButtonProps;
export default function ButtonMenu(props: ButtonMenuProps) {
  const { menuInstance, children, ...rest } = props;
  const id = menuInstance.id;
  const name = menuInstance.name;
  const type = menuInstance.type;

  const [state, setState] = useState(menuInstance.state);
  const { show, active } = state;

  // 监听到状态变更，更新内部样式
  useEffect(() => {
    menuInstance.updator(setState);
    return () => {
      menuInstance.updator(undefined);
    };
  }, []);
  return (
    show && (
      <Button
        {...rest}
        data-id={id}
        data-command={name}
        data-type={type}
        onClick={() => {
          menuInstance.execute("click");
        }}
        disabled={!active}
      >
        {children}
      </Button>
    )
  );
}
