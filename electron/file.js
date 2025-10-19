/* eslint-disable @typescript-eslint/no-require-imports */
const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;
ipcMain.handle('file:read', async (_, relativePath) => {
          try {
                    const filePathRes = path.join(__dirname, '..', 'data', relativePath);
                    const content = await fs.readFile(filePathRes, 'utf8');
                    return content;
          } catch (err) {
                    return `Lỗi đọc file: ${err}`;
          }
});

ipcMain.handle('file:write', async (_, relativePath, content) => {
          try {
                    const filePathRes = path.join(__dirname, '..', 'data', relativePath);
                    await fs.writeFile(filePathRes, content, 'utf8');
                    return true;
          } catch (err) {
                    return `Lỗi ghi file: ${err.message}`;
          }
});