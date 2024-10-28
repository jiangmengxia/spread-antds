/*
 * @Description:
 * @Author: Jiangmengxia
 * @Email: jiangmengxia@nnuo.com
 * @Date: 2023-11-29 10:22:33
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-28 13:44:17
 * @FilePath: \spread-antds\packages\spread2antds\DatePickerCellType\index.jsx
 */
import * as GC from "@grapecity/spread-sheets";
import { DatePicker } from "antd";
import * as moment from "moment";
import React from "react";
import { createRoot } from "react-dom/client";
import "antd/lib/date-picker/style/css";
import ReactDom from "react-dom";
import zhCN from "antd/lib/date-picker/locale/zh_CN";
import render, { generateUUID } from "../utils/index";
import { isEmpty } from "../utils/index";

export default class DatePickerCellType extends GC.Spread.Sheets.CellTypes
  .Base {
  constructor(props) {
    super();
    const { disabledDate, datePickerProps = {} } = props || {};
    this._value = "";
    this.datePickerProps = datePickerProps || {};
    this.disabledDate = disabledDate;
    this._id = generateUUID();
  }

  createEditorElement() {
    const wrap = document.createElement("div");
    this.wrap = wrap;
    return wrap;
  }

  activateEditor(editorContext, cellStyle, cellRect, context) {
    const { width, height, x: cleft, y: ctop } = cellRect;
    const { sheet, row, col } = context;
    const hostDiv = sheet.getParent().getHost();
    console.log("getParent", sheet.getParent());
    const spread = sheet.getParent();
    // const canvasId = `${hostDiv}vp_vp`;
    // console.log('hostDiv', hostDiv, hostDiv.getBoundingClientRect());
    const { x, y } = hostDiv.getBoundingClientRect();

    let wrap2 = document.getElementById(this._id);
    if (!wrap2) {
      wrap2 = document.createElement("div");
      wrap2.id = this._id;
      const style = {
        width: `${width}px`,
        height: `${height}px`,
        position: "absolute",
        left: `${cleft + x}px`,
        top: `${ctop + y}px`,
        // border: '1px solid #000',
      };
      Object.keys(style).forEach((attr) => {
        wrap2.style[attr] = style[attr];
      });
      document.body.appendChild(wrap2);
    }
    const cellValue = sheet.getCell(row, col).value();
    const pickerId = `calendar_${this._id}`;
    const removeEvents = () => {
      if (!this._events) return;
      document
        .querySelector(`#${pickerId} .${pickerId}`)
        ?.removeEventListener("click", this._events.innerClick);
      document.body?.removeEventListener("click", this._events.outerClick);
      this._events = undefined;
    };
    const close = () => {
      removeEvents();
      // eslint-disable-next-line no-shadow
      const wrap2 = document.getElementById(this._id);
      wrap2.childNodes.forEach((node) => {
        wrap2.removeChild(node);
      });
      wrap2.remove();
    };
    const vdom = (
      <DatePicker
        {...this.datePickerProps}
        value={cellValue && moment(cellValue)}
        disabledDate={this.disabledDate}
        open
        id={pickerId}
        dropdownClassName={pickerId}
        locale={zhCN}
        onChange={(v) => {
          // 不允许清空
          if (isEmpty(v) && !this.datePickerProps.allowClear) return;
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
        getCalendarContainer={(e) => e.parentElement}
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

    document
      .querySelector(`#${pickerId} .${pickerId}`)
      .addEventListener("click", this._events.innerClick, false);
    document.body.addEventListener("mouseup", this._events.outerClick, false);
  }

  // deactivateEditor() {
  //   console.log('deactivateEditor');
  // }

  setEditorValue(editor, value) {
    this._tmpValue = value;
  }

  getEditorValue(editor) {
    return this._tmpValue;
  }
}
