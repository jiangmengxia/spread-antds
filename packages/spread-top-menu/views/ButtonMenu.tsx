/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-31 14:12:18
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-31 15:17:32
 * @FilePath: \spread-antds\packages\spreadTopMenu\views\ButtonMenu.tsx
 * @Description: Description
 */

import React from "react";
import { Menu } from "../Menu";
import Button, { ButtonProps } from "antd/lib/button";

type ButtonMenuProps = {
  menuInstance: Menu;
} & ButtonProps;
export default function ButtonMenu(props: ButtonMenuProps) {
  const { menuInstance, children, ...rest } = props;
  const id = menuInstance.id;
  const name = menuInstance.name;
  const type = menuInstance.type;
  const { show, active } = menuInstance.state;
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
