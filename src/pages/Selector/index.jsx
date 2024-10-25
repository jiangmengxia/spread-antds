/*
 * @Author: jmx 1024775461@qq.com
 * @Date: 2024-10-25 21:59:15
 * @LastEditors: jmx 1024775461@qq.com
 * @LastEditTime: 2024-10-25 23:00:37
 * @FilePath: /spread-antds/src/pages/Selector/index.jsx
 * @Description: Description
 */
import GC from "@grapecity/spread-sheets";
import "@grapecity/spread-sheets-resources-zh";
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
import { SpreadSheets, Worksheet } from "@grapecity/spread-sheets-react";
import { useRef } from "react";
import SelectCellType from "spread2antds/SelectCellType";

export default function Selector() {
  const spreadInstance = useRef();
  //   const spread = spreadInstance.current;
  function workbookInit(_spread) {
    console.log("_spread", _spread);
    if (!_spread) {
      return;
    }
    spreadInstance.current = _spread;
    GC.Spread.Common.CultureManager.culture("zh-cn");

    const sheet = _spread.getActiveSheet();
    const cell = sheet.getCell(0, 0);
    /**
     * 设置自定义单元格类型
     * 注意，1. 每次表样初始化的时候，都需要重新设置
     *       2. 新增行或者拷贝行时，对应单元格也需要重新初始化，因为自定义的单元格类型，都需要实例化，葡萄城才能识别。
     */
    cell.cellType(
      new SelectCellType({
        items: [
          { text: "选项1", value: "1" },
          { text: "选项2", value: "2" },
        ],
      })
    );
  }
  return (
    <div
      className="spreadsheetWrap"
      style={{ height: 600, width: 800, border: "1px solid red" }}
    >
      <SpreadSheets
        hostClass={` spreadsheet1`}
        workbookInitialized={(e) => {
          workbookInit(e);
        }}
      >
        <Worksheet />
      </SpreadSheets>
    </div>
  );
}
