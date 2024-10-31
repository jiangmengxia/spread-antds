/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-31 11:03:39
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-31 15:13:03
 * @FilePath: \spread-antds\packages\spreadTopMenu\Menu.ts
 * @description： 菜单项，通用属性：id、name、type
 *                       通用方法：操作，响应
 */

import { Operator } from "./Operator";

export type CommonMenuState = {
  show: boolean; // 是否展示
  active: boolean; // 是否高亮
  value: any; // 当前值，设置值
};

const INITSTATE: CommonMenuState = {
  show: false,
  active: false,
  value: null,
};
// 菜单基础属性
export type MenuBaseProperty = {
  id: string;
  name: string;
  type: string;
  state: CommonMenuState; // 菜单项状态
};

export abstract class Menu {
  private _id: string; // id 唯一标识
  private _name: string; // 名称, 如剪切、复制、粘贴,用于区分功能的
  private _type: string; // 类型
  private _state: CommonMenuState; // 菜单项状态
  private _operator: Operator; // 操作

  constructor(menu: MenuBaseProperty, operator: Operator) {
    const { id, name, type, state } = menu;
    this._id = id;
    this._name = name;
    this._type = type;
    this._state = state;
    this._operator = operator;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }

  get state(): CommonMenuState {
    return this._state;
  }

  // 触发某项操作
  public execute(actionType: string) {
    this._operator.execute({
      id: this._id,
      name: this._name,
      type: this._type,
      state: this.state,
      actionType,
    });
  }

  // 展示
  abstract render();
}
