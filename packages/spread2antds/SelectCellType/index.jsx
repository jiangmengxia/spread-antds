/*
 * @Description:自定义葡萄城组件——选择器
 * @Author: Jiangmengxia
 * @Email: jiangmengxia@nnuo.com
 * @Date: 2023-11-29 10:22:33
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-28 13:45:16
 * @FilePath: \spread-antds\packages\spread2antds\SelectCellType\index.jsx
 */
import * as GC from "@grapecity/spread-sheets";
import { Select } from "antd";
import ReactDom from "react-dom";
import zhCN from "antd/lib/date-picker/locale/zh_CN";
import render, { generateUUID } from "../utils/index";
import { isEmpty } from "../utils/index";

export default class SelectCellType extends GC.Spread.Sheets.CellTypes.Base {
  items(...args) {
    //  获取
    if (args.length === 0) {
      return this._items;
    }
    // 设置
    const [options] = args;
    this._items = options?.length
      ? this._removeDuplicateByValueKey(options)
      : [];
    return this._items;
  }

  constructor(props) {
    super();
    const {
      items = [],
      selectProps = {},
      keyVaue = "value",
      valueKey = "text", // 一般默认单元格设置值为减免性质代码的内容，因此这里设为text，如果需要其他值，自行修改
      labelKey = "text", // 一般显示值为减免性质代码的内容，因此这里设为text，如果需要其他值，自行修改
    } = props || {};
    this._id = `JMX_${generateUUID()}`;
    this._selectProps = selectProps || {};
    this._open = false;
    this._selectId = `select_${this._id}`;
    this._events = undefined;
    this._valueKey = valueKey; // 下拉展示的内容
    this._keyValue = keyVaue; //  下拉项的Key值,唯一标识
    this._labelKey = labelKey; // 下拉项的label值
    this._items = this._removeDuplicateByValueKey(items);
  }

  // antd select组件不允许key重复，因此需要去重
  _removeDuplicateByValueKey(items) {
    const list = [];
    const values = [];
    if (items.length > 0) {
      items.forEach((item) => {
        const { [this._valueKey]: value } = item;
        if (!values.includes(value)) {
          values.push(value);
          list.push(item);
        }
      });
    }
    return list;
  }

  // 展示格式化
  format(value) {
    return (
      this._items.find((item) => item[this._valueKey] === value)?.[
        this._labelKey
      ] || value
    );
  }

  createEditorElement() {
    const wrap = document.createElement("div");
    return wrap;
  }

  // 删除监听事件
  _removeEvents() {
    if (!this._events) return;
    document.body?.removeEventListener("click", this._events.outerClick);
    this._events = undefined;
  }

  // 关闭弹窗
  _close = () => {
    this._removeEvents();
    const wrap2 = document.getElementById(this._id);
    const inter = setTimeout(() => {
      wrap2?.remove();
      clearTimeout(inter);
    }, 100);
    this._open = false;
  };

  // 双击单元格会触发的操作
  activateEditor(editorContext, cellStyle, cellRect, context) {
    this._removeEvents();
    GC.Spread.Sheets.CellTypes.Base.prototype.activateEditor.call(
      this,
      editorContext,
      cellStyle,
      cellRect,
      context
    );
    const { width, height, x: cleft, y: ctop } = cellRect;
    const { sheet, row, col } = context;
    const hostDiv = sheet.getParent().getHost();
    const spread = sheet.getParent();
    const { x, y } = hostDiv.getBoundingClientRect();

    const [_, paddingLeft, __, paddingRight] = cellStyle?.cellPadding?.split(
      " "
    ) || [0, 0, 0, 0];

    let wrap2 = document.getElementById(this._id);

    const style = {
      width: `${
        Number(width) + Number(paddingRight || 0) + Number(paddingLeft || 0) + 2
      }px`,
      height: `${height}px`,
      position: "absolute",
      left: `${cleft + x - paddingLeft}px`,
      top: `${ctop + y}px`,
    };
    if (!wrap2) {
      wrap2 = document.createElement("div");
      wrap2.id = this._id;

      Object.keys(style).forEach((attr) => {
        wrap2.style[attr] = style[attr];
      });
      document.body.appendChild(wrap2);
    }
    const cellValue = sheet.getCell(row, col).value();
    const selectId = this._selectId;

    this._open = true;
    const self = this;
    const vdom = (
      <Select
        showSearch
        filterOption={(inputValue, option) => {
          return option.props.children.indexOf(inputValue) !== -1;
        }}
        {...this._selectProps}
        style={{
          width: "100%",
          height: "100%",
          transform: "translateY(-4px)",
        }}
        open
        id={selectId}
        dropdownClassName={selectId}
        dropdownMatchSelectWidth={false}
        locale={zhCN}
        value={cellValue}
        getPopupContainer={(e) =>
          document.getElementById(self._id) || e.parentElement
        }
        onChange={(v) => {
          // 不允许清空
          if (isEmpty(v) && !this._selectProps.allowClear) return;
          // 如果新值和旧值相同，则不执行
          if (v !== cellValue) {
            spread.commandManager().execute({
              cmd: "editCell",
              sheetName: sheet.name(),
              row,
              col,
              newValue: v,
            });
          }
          self._close();
        }}
      >
        {this._items.map((item, index) => {
          return (
            <Select.Option
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}_${item[this._keyValue]}_${item[this._labelKey]}`}
              value={item[this._valueKey]}
              title={item[this._labelKey]}
              label={item[this._labelKey]}
            >
              {item[this._labelKey]}
            </Select.Option>
          );
        })}
      </Select>
    );

    render(wrap2, vdom);

    if (!this._events) {
      this._events = {
        outerClick: (e) => {
          const wrap = document.getElementById(self._id);
          if (wrap) {
            if (!wrap.contains(e.target)) {
              const selection = window.getSelection();
              if (selection) {
                try {
                  selection?.selectAllChildren(wrap);
                } catch (err) {
                  // console.log(err);
                }
                const ret = selection.containsNode(e.target);
                if (!ret) {
                  this._close();
                }
                selection.empty(); // 取消选中
              }
            }
          }
        },
      };
    } else {
      this._removeEvents();
    }

    document.body.addEventListener("click", this._events.outerClick, false);
  }

  setEditorValue(editor, value) {
    this._tmpValue = value;
  }

  getEditorValue() {
    return this._tmpValue;
  }
}
