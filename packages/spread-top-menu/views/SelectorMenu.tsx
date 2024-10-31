/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-31 14:12:18
 * @LastEditors: jmx 1024775461@qq.com
 * @LastEditTime: 2024-10-31 21:40:14
 * @FilePath: /spread-antds/packages/spread-top-menu/views/SelectorMenu.tsx
 * @Description: Description
 */

import React from "react";
import { Menu } from "../Menu";
import Select, { SelectProps } from "antd/lib/select";

type SelectorMenuProps = {
  menuInstance: Menu;
} & SelectProps;
export default function SelectMenu(props: SelectorMenuProps) {
  const { menuInstance, ...rest } = props;
  const id = menuInstance.id;
  const name = menuInstance.name;
  const type = menuInstance.type;
  const { show, active } = menuInstance.state;
  return (
    show && (
      <Select
        {...rest}
        data-id={id}
        data-command={name}
        data-type={type}
        onChange={() => {
          menuInstance.execute("change");
        }}
        disabled={!active}
      />
    )
  );
}
