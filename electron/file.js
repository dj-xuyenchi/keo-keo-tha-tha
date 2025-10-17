/* eslint-disable @typescript-eslint/no-require-imports */
const { ipcMain } = require('electron');
const fs = require('fs').promises;

ipcMain.handle('file:read', async (_, filePath) => {
          try {
                    const content = await fs.readFile(filePath, 'utf8');
                    return content;
          } catch (err) {
                    return `Lỗi đọc file: ${err.message}`;
          }
});

ipcMain.handle('file:write', async (_, filePath, content) => {
          try {
                    await fs.writeFile(filePath, content, 'utf8');
                    return true;
          } catch (err) {
                    return `Lỗi ghi file: ${err.message}`;
          }
});
