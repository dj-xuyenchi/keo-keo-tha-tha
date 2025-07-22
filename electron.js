const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
          const win = new BrowserWindow({
                    width: 1280,
                    height: 800,
                    webPreferences: {
                              nodeIntegration: true,
                              contextIsolation: false,
                    },
          });

          const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, 'out/index.html')}`;
          
          win.loadURL(startUrl);
}

app.on('ready', createWindow);
