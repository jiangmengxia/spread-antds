/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-31 14:12:18
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-31 15:21:25
 * @FilePath: \spread-antds\packages\spreadTopMenu\views\SelectorMenu.tsx
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
