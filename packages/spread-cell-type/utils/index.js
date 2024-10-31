/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-22 16:10:02
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-31 16:31:32
 * @FilePath: \spread-antds\packages\spread-cell-type\utils\index.js
 * @Description: Description
 *
 */
import ReactDOM from "react-dom";

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function isEmpty(obj) {
  return [null, undefined, ""].includes(obj);
}

// const spreadAntdsManager = {
//   // 用于存放组件实例，一个ID对应一个实例
//   instanceMap: {},
//   wrapNode: null, // 节点复用
//   createEditorElement: function () {
//     // 当前节点存在，则直接复用
//     if (wrapNode && document.body.contains(wrapNode)) {
//       return wrapNode;
//     }
//     const wrap = document.createElement("div");
//     return wrap;
//   },
// };

export default function render(container, vDOM) {
  if (ReactDOM.render) {
    ReactDOM.render(vDOM, container);
  }
}
