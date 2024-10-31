/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-31 11:03:39
 * @LastEditors: jmx 1024775461@qq.com
 * @LastEditTime: 2024-10-31 20:54:14
 * @FilePath: /spread-antds/packages/spread-top-menu/Menu.ts
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
  state: CommonMenuState | any; // 菜单项状态
};

export class Menu {
  private _id: string; // id 唯一标识
  private _name: string; // 名称, 如剪切、复制、粘贴,用于区分功能的
  private _type: string; // 类型
  private _state: CommonMenuState; // 菜单项状态
  private _operator: Operator; // 操作
  private _updator: (CommonMenuState) => void; // 更新视图

  constructor(menu: MenuBaseProperty, operator: Operator) {
    const { id, name, type, state = INITSTATE } = menu;
    this._id = id;
    this._name = name;
    this._type = type;
    this._state = state || INITSTATE;
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

  set state(state: CommonMenuState) {
    this._state = state;
    this?._updator(state); // 状态更新后，主动更新视图
  }

  set updator(updator: (CommonMenuState) => {}) {
    this._updator = updator;
  }

  // 触发某项操作
  public execute(actionType: string, payload?: any) {
    this._operator.execute({
      type: actionType,
      menuInfo: {
        id: this._id,
        name: this._name,
        type: this._type, // 菜单项类型，用于区分功能
        state: this.state,
      },
      payload,
    });
  }

  //
}
