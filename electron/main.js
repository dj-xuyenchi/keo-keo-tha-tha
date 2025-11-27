/* eslint-disable @typescript-eslint/no-require-imports */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('./file');
try {
  require('electron-reloader')(module); // 🔁 tự reload main process khi sửa
} catch (_) {
  console.log('Reloading not active');
}

function createWindow() {
  const isDev = !app.isPackaged;

  const win = new BrowserWindow({
    width: 1780,
    height: 1200,
    title: "Kéo kéo thả thả :3",
    icon: path.join(__dirname, 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,     // ✅ bắt buộc để expose được API
      nodeIntegration: false,     // ✅ an toàn, không xung đột
      webSecurity: false,
    },
  });
  let forceClose = false;

  win.on('close', (event) => {
    if (!forceClose) {
      event.preventDefault(); // ⛔ Chặn hành động đóng

      // Gửi sang renderer để hiển thị modal Confirm
      win.webContents.send('show-exit-confirm');
    }
  });

  ipcMain.on('exit-confirmed', () => {
    forceClose = true;
    win.close(); // 👉 Lần này cho phép đóng
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

  if (isDev) {
    win.loadURL(process.env.ELECTRON_START_URL);
    win.webContents.openDevTools();
  } else {
    // 👉 Production: load file tĩnh
    const indexPath = path.join(__dirname, '../out/index.html');
    win.loadFile(indexPath);
    // 🧠 Rất quan trọng: sửa base URL cho file tĩnh
    win.webContents.on('did-finish-load', () => {
      win.webContents.executeJavaScript(`
        const base = document.createElement('base');
        base.href = './';
        document.head.appendChild(base);
      `);
    });
  }

  // Open the DevTools.
  win.webContents.openDevTools()
}

app.on('ready', createWindow);

