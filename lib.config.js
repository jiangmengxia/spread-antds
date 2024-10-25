/*
 * @Author: jmx 1024775461@qq.com
 * @Date: 2024-10-25 22:45:47
 * @LastEditors: jmx 1024775461@qq.com
 * @LastEditTime: 2024-10-25 23:11:40
 * @FilePath: /spread-antds/lib.config.js
 * @Description: Description
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copy } from "fs-extra";
import { resolve, join } from "path";

function copyFolderPlugin(source, destination) {
  return {
    name: "copy-folder-plugin",
    async writeBundle({ dir, config }) {
      const resolvedSource = resolve(config.root, source);
      const resolvedDestination = join(dir, destination);
      await copy(resolvedSource, resolvedDestination);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "./packages/spread2antds/index.js",
      name: "spread2antds",
    },
    copyPublicDir: true,
    outDir: "lib",
  },
  plugins: [
    react(),
    // copyFolderPlugin("packages/spread2antds", "lib/components"), // 复制public文件夹到dist目录
  ],
});
