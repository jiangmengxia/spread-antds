/*
 * @Author: jmx 1024775461@qq.com
 * @Date: 2024-10-25 20:16:45
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-10-31 16:35:33
 * @FilePath: \spread-antds\src\main.jsx
 * @Description: Description
 */
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

let container = document.getElementById("root");
if (!container) {
  document.createElement("div", { id: "root" });
  document.body.appendChild(container);
}
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  container
);
