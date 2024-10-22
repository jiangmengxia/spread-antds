function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const spreadAntdsManager = {
  // 用于存放组件实例，一个ID对应一个实例
  instanceMap: {},
  wrapNode: null, // 节点复用
  createEditorElement: function () {
    // 当前节点存在，则直接复用
    if (wrapNode && document.body.contains(wrapNode)) {
      return wrapNode;
    }
    const wrap = document.createElement("div");
    return wrap;
  },
};
