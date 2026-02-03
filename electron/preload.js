/* eslint-disable @typescript-eslint/no-require-imports */
const { contextBridge, ipcRenderer } = require('electron');

// hàm invoke để chọc vào chỗ khai báo hàm IPC
contextBridge.exposeInMainWorld('electronAPI', {
          readFile: (path) => ipcRenderer.invoke('file:read', path),
          writeFile: (path, content) => ipcRenderer.invoke('file:write', path, content),
          listFiles: (dir) => ipcRenderer.invoke("file:list", dir),
          createFile: (path, content) => ipcRenderer.invoke("file:create", path, content),
          deleteFile: (path) => ipcRenderer.invoke("file:delete", path),
          onShowExitConfirm: (callback) => ipcRenderer.on('show-exit-confirm', callback),
          confirmExit: () => ipcRenderer.send('exit-confirmed'),
          debug: () => ipcRenderer.invoke('dotnet:run')
});