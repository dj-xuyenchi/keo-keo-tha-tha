const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

try {
          require('electron-reloader')(module); // 🔁 tự reload main process khi sửa
} catch (_) {
          console.log('Reloading not active');
}
function createWindow() {
          const win = new BrowserWindow({
                    width: 1580,
                    height: 1200,
                    autoHideMenuBar: true,
                    webPreferences: {
                              nodeIntegration: true,
                              contextIsolation: true,
                              webSecurity: false,
                    },
          });
          win.webContents.on('will-navigate', (e) => e.preventDefault());

          win.webContents.on('will-prevent-unload', (e) => e.preventDefault());

          // Ngăn Electron chặn drag & drop
          win.webContents.session.webRequest.onBeforeRequest(
                    { urls: ['*://*/*'] },
                    (details, callback) => {
                              if (details.method === 'POST' && details.uploadData) {
                                        callback({ cancel: true }); // Không cần thiết nếu không kéo file vào
                              } else {
                                        callback({ cancel: false });
                              }
                    }
          );

          const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, 'out/index.html')}`;

          win.loadURL(startUrl);

          // Open the DevTools.
          win.webContents.openDevTools()
}

app.on('ready', createWindow);

