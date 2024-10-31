/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-31 11:03:39
 * @LastEditors: jmx 1024775461@qq.com
 * @LastEditTime: 2024-10-31 20:48:08
 * @FilePath: /spread-antds/packages/spread-top-menu/Operator.ts
 * @description： 操作器，具体实现根据不同操作类型，执行操作事件
 */
export type OperatorMap = Map<string, Array<Function>>;
type Operation = {
  [key: string]: Function;
};

export class Operator {
  _oprationMap: OperatorMap;
  constructor(operationMap: OperatorMap = new Map()) {
    this._oprationMap = operationMap || new Map();
  }

  // 添加操作
  addOpperation(type: string, fn: Function) {
    if (!type) {
      console.error(`【addOpperation】type缺少`);
      return;
    }
    if (!this._oprationMap.has(type)) {
      this._oprationMap.set(type, []);
    }
    // 事件不能重复添加

    if (!this._oprationMap.get(type)?.includes(fn)) {
      this._oprationMap.get(type)?.push(fn);
    }
  }

  // 删除操作
  removeOpperation(type: string, fn: Function) {
    const index = this._oprationMap.get(type)?.indexOf(fn);
    if (index && index > -1) {
      this._oprationMap.get(type)?.splice(index, 1);
    }
  }

  // 执行操作, type操作命令，payload参数
  execute({ type, ...args }) {
    if (this._oprationMap.has(type)) {
      this._oprationMap.get(type)?.forEach((fn) => {
        fn?.({ type, ...args });
      });
    }
  }
}
// 按钮具备的操作
// export type ButtonOperation = CommonOperation;

function buttonOperationType2Map(operationMap: Operation): OperatorMap {
  const map = new Map();
  for (const [key, value] of Object.entries(operationMap)) {
    map.set(key, value);
  }
  return map;
}

// 创建operator实例，根据不同操作类型，执行操作事件
export function createOperator(operation: Operation) {
  const map = buttonOperationType2Map(operation);
  return new Operator(map);
}
