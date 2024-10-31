/*
 * @Description:
 * @Author: Jiangmengxia
 * @Email: jiangmengxia@nnuo.com
 * @Date: 2023-11-29 10:22:33
 * @LastEditors: jmx 1024775461@qq.com
 * @LastEditTime: 2024-10-31 22:23:18
 * @FilePath: /spread-antds/packages/spread-cell-type/DatePickerCellType/index.tsx
 */
import * as GC from "@grapecity/spread-sheets";
import { DatePicker, DatePickerProps } from "antd";
import moment from "moment";
import React from "react";
import render, { generateUUID } from "../utils/index";
import { isEmpty } from "../utils/index";
import zhCN from "antd/lib/date-picker/locale/zh_CN";
import "antd/lib/date-picker/style/css";

export default class DatePickerCellType extends GC.Spread.Sheets.CellTypes
  .Base {
  private _datePickerProps: DatePickerProps;
  private _id: string;
  private _events:
    | {
        innerClick?: (e: any) => {} | void;
        outerClick?: (e: any) => {} | void;
      }
    | undefined;

  constructor(datePickerProps: DatePickerProps) {
    super();
    this._datePickerProps = datePickerProps; // 日期选择器属性
    this._id = generateUUID(); // 生成唯一id
  }

  createEditorElement() {
    const wrap = document.createElement("div");
    return wrap;
  }

  activateEditor(editorContext, cellStyle, cellRect, context) {
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
    if (!wrap2) {
      wrap2 = document.createElement("div");
      wrap2.id = this._id;

      const styles = {
        width: `${
          Number(width) +
          Number(paddingRight || 0) +
          Number(paddingLeft || 0) +
          2
        }px`,
        height: `${height}px`,
        position: "absolute",
        left: `${cleft + x - paddingLeft}px`,
        top: `${ctop + y}px`,
      };
      Object.keys(styles)?.forEach((attr) => {
        if (wrap2?.style instanceof CSSStyleDeclaration) {
          wrap2.style![attr] = styles[attr];
        }
      });
      document.body.appendChild(wrap2);
    }
    const cellValue = sheet.getCell(row, col).value();
    const pickerId = `calendar_${this._id}`;
    const removeEvents = () => {
      if (!this._events) return;
      const objNode = document?.querySelector(`#${pickerId} .${pickerId}`);
      if (objNode) {
        objNode?.removeEventListener("click", this._events?.innerClick);
      }

      document.body?.removeEventListener("click", this._events?.outerClick);
      this._events = undefined;
    };
    const close = () => {
      removeEvents();
      // eslint-disable-next-line no-shadow
      const wrap2 = document.getElementById(this._id);
      wrap2?.childNodes.forEach((node) => {
        wrap2.removeChild(node);
      });
      wrap2?.remove();
    };
    const vdom = (
      <DatePicker
        {...this._datePickerProps}
        value={cellValue && moment(cellValue)}
        open
        id={pickerId}
        dropdownClassName={pickerId}
        locale={zhCN}
        onChange={(v) => {
          // 不允许清空
          if (isEmpty(v) && !this._datePickerProps.allowClear) return;
          if (moment(v).format("YYYY-MM-DD") !== cellValue) {
            spread.commandManager().execute({
              cmd: "editCell",
              sheetName: sheet.name(),
              row,
              col,
              newValue: moment(v).format("YYYY-MM-DD"),
            });
            // 更新公式详情展示区的内容
            spread.commandManager().execute({
              cmd: "gc.spread.custom.refreshForumulaDetail",
              sheet,
              row,
              col,
              value: moment(v).format("YYYY-MM-DD"),
            });
          }
          close();
        }}
        getPopupContainer={(e) =>
          document.getElementById(this._id) || e.parentElement
        }
        style={{ width: "100%", height: "100%" }}
      />
    );
    render(wrap2, vdom);
    if (!this._events) {
      this._events = {
        innerClick: (e) => {
          e.preventDefault();
        },
        outerClick: (e) => {
          const wrap = document.querySelector(`#${pickerId} .${pickerId}`);
          if (!wrap) return;
          if (e.target === wrap?.querySelector("input")) {
            e.preventDefault();
            return;
          }
          if (document.activeElement === wrap?.querySelector("input")) {
            return;
          }
          const selection = window.getSelection();
          if (!selection) return;
          selection?.selectAllChildren(wrap);
          const ret = selection.containsNode(e.target);
          if (!ret) {
            close();
          }
          selection.empty(); // 取消选中
        },
      };
    } else {
      removeEvents();
    }
  }

  setEditorValue(editor, value) {
    // this._tmpValue = value;
  }

  getEditorValue(editor) {
    // return this._tmpValue;
  }
}
