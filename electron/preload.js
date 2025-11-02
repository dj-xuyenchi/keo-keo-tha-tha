/* eslint-disable @typescript-eslint/no-require-imports */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
          readFile: (path) => ipcRenderer.invoke('file:read', path),
          writeFile: (path, content) => ipcRenderer.invoke('file:write', path, content),
          listFiles: (dir) => ipcRenderer.invoke("file:list", dir),
          createFile: (path, content) => ipcRenderer.invoke("file:create", path, content), 
          deleteFile: (path) => ipcRenderer.invoke("file:delete", path),
});