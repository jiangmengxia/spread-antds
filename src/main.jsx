/*
 * @Author: jmx 1024775461@qq.com
 * @Date: 2024-10-25 20:16:45
 * @LastEditors: jmx 1024775461@qq.com
 * @LastEditTime: 2024-10-25 21:37:36
 * @FilePath: /spread-antds/src/main.jsx
 * @Description: Description
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
