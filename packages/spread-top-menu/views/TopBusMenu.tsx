/*
 * @Author: jmx 1024775461@qq.com
 * @Date: 2024-10-31 20:10:43
 * @LastEditors: jmx 1024775461@qq.com
 * @LastEditTime: 2024-10-31 21:26:20
 * @FilePath: /spread-antds/packages/spread-top-menu/views/TopBusMenu.tsx
 * @Description: 顶部业务菜单
 */
import React from "react";
import { Menu, MenuBaseProperty } from "../Menu";
import { Operator } from "../Operator";
import ButtonMenu from "./ButtonMenu";
import SelectorMenu from "./SelectorMenu";

const operator = new Operator();
const menuMap = {
  copy: {
    id: "copy",
    name: "复制",
    type: "button",
  },
  paste: {
    id: "paste",
    name: "粘贴",
    type: "button",
  },
  undo: {
    id: "undo",
    name: "撤销",
    type: "button",
  },
  fontSize: {
    id: "fontSize",
    name: "字体大小",
    type: "select",
  },
};
const copyMenu = new Menu(menuMap.copy as MenuBaseProperty, operator);
const pasteMenu = new Menu(menuMap.paste as MenuBaseProperty, operator);
const undoMenu = new Menu(menuMap.undo as MenuBaseProperty, operator);
const fontSizeMenu = new Menu(menuMap.fontSize as MenuBaseProperty, operator);
export function TopMenuEvent() {
  return (
    <div>
      <ButtonMenu menuInstance={copyMenu} />
      <ButtonMenu menuInstance={pasteMenu} />
      <ButtonMenu menuInstance={undoMenu} />
      <SelectorMenu
        menuInstance={fontSizeMenu}
        optionFilterProp="children"
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "tom",
            label: "Tom",
          },
        ]}
      />
    </div>
  );
}
