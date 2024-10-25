/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-10-25 15:18:07
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-25 17:51:11
 * @FilePath: \spread-antds\test\src\pages\Selector\index.jsx
 * @Description: Description
 */
import React from 'react';
import GC from '@grapecity/spread-sheets';
import '@grapecity/spread-sheets-resources-zh';
import '@grapecity/spread-sheets-shapes';
import '@grapecity/spread-sheets-print';
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css';
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';
import { useRef } from 'react';
import SelectCellType from '@packages/SelectCellType';

export default function Selector() {
  const spreadInstance = useRef();
  const spread = spreadInstance.current;
  function workbookInit(_spread) {
    console.log('_spread', _spread);
    if (!_spread) {
      return;
    }
    spreadInstance.current = _spread;
    GC.Spread.Common.CultureManager.culture('zh-cn');
    GC.Spread.CalcEngine.ExcelCompatibleCalcMode = true;

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
          { text: '选项1', value: '1' },
          { text: '选项2', value: '2' },
        ],
      }),
    );
  }
  return (
    <div className="spreadsheetWrap" style={{ height: `600px` }}>
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
