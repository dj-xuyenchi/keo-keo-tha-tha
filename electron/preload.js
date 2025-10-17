/* eslint-disable @typescript-eslint/no-require-imports */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
          readFile: (path) => ipcRenderer.invoke('file:read', path),
          writeFile: (path, content) => ipcRenderer.invoke('file:write', path, content),
});