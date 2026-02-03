/* eslint-disable @typescript-eslint/no-require-imports */
const { ipcMain, app } = require('electron');
const { spawn } = require('child_process');
const os = require('os');
const fsBuild = require('fs');
const path = require('path');
const fs = require('fs').promises;

const isDev = !app.isPackaged;
const baseDataPath = isDev
          ? path.join(__dirname, '..', 'data')
          : path.join(process.resourcesPath, 'data');

ipcMain.handle('file:read', async (_, relativePath) => {
          try {
                    const filePathRes = path.join(baseDataPath, relativePath);
                    const content = await fs.readFile(filePathRes, 'utf8');
                    return content;
          } catch (err) {
                    return `Lỗi đọc file: ${err}`;
          }
});

ipcMain.handle('file:write', async (_, relativePath, content) => {
          try {
                    const filePathRes = path.join(baseDataPath, relativePath);
                    await fs.writeFile(filePathRes, content, 'utf8');
                    return true;
          } catch (err) {
                    return `Lỗi ghi file: ${err.message}`;
          }
});
// 🔹 Đọc danh sách file trong thư mục
ipcMain.handle('file:list', async (_, relativeDir = '') => {
          try {
                    const dirPath = path.join(baseDataPath, relativeDir);
                    const entries = await fs.readdir(dirPath, { withFileTypes: true });

                    const result = await Promise.all(
                              entries.map(async (entry) => {
                                        const fullPath = path.join(dirPath, entry.name);
                                        const stats = await fs.stat(fullPath);
                                        return {
                                                  name: entry.name,
                                                  isDirectory: entry.isDirectory(),
                                                  size: stats.size,
                                                  modified: stats.mtime,
                                        };
                              })
                    );

                    return result;
          } catch (err) {
                    return `Lỗi đọc thư mục: ${err.message}`;
          }
});

// 🔹 Tạo file mới
ipcMain.handle('file:create', async (_, relativePath, initialContent = '') => {
          try {
                    const filePathRes = path.join(baseDataPath, relativePath);
                    const dir = path.dirname(filePathRes);

                    // Đảm bảo thư mục cha tồn tại
                    await fs.mkdir(dir, { recursive: true });

                    // Kiểm tra nếu file đã tồn tại
                    try {
                              await fs.access(filePathRes);
                              return false;
                    } catch {
                              // File chưa tồn tại → tạo mới
                              await fs.writeFile(filePathRes, initialContent, 'utf8');
                              return true;
                    }
          } catch (err) {
                    console.error(err);
                    return false;
          }
});// 🔹 Xóa file hoặc thư mục
ipcMain.handle('file:delete', async (_, relativePath) => {
          try {
                    const filePathRes = path.join(baseDataPath, relativePath);

                    // Kiểm tra xem có tồn tại không
                    const stat = await fs.stat(filePathRes).catch(() => null);
                    if (!stat) {
                              return false;
                    }

                    if (stat.isDirectory()) {
                              await fs.rm(filePathRes, { recursive: true, force: true });
                    } else {
                              await fs.unlink(filePathRes);
                    }

                    return true;
          } catch (err) {
                    console.error(err);
                    return false;
          }
});

function getDotnetPath() {
          if (process.platform === 'win32') {
                    const winPath = 'C:\\Program Files\\dotnet\\dotnet.exe';
                    if (fsBuild.existsSync(winPath)) return winPath;
          }

          if (process.platform === 'darwin') {
                    const macPath = '/usr/local/share/dotnet/dotnet';
                    if (fsBuild.existsSync(macPath)) return macPath;

                    // Apple Silicon
                    const macArmPath = '/opt/homebrew/bin/dotnet';
                    if (fsBuild.existsSync(macArmPath)) return macArmPath;
          }

          throw new Error('Không tìm thấy dotnet runtime');
} 
function getDllPath() {
          if (isDev) {
                    return path.join(
                              app.getAppPath(), // => KEO-KEO-THA-THA/electron
                              'tools',
                              'HighLand.dll'
                    );
          }

          return path.join(
                    process.resourcesPath,
                    'tools',
                    'HighLand.dll'
          );
}
ipcMain.handle('dotnet:run', async (_, args = []) => {
          return new Promise((resolve, reject) => {
                    try {
                              const dotnetPath = getDotnetPath();
                              const dllPath = getDllPath();

                              console.log('dotnet:', dotnetPath);
                              console.log('dll:', dllPath);

                              const child = spawn(dotnetPath, [dllPath, ...args], {
                                        cwd: path.dirname(dllPath),
                              });

                              let stdout = '';
                              let stderr = '';

                              child.stdout.on('data', d => stdout += d.toString());
                              child.stderr.on('data', d => stderr += d.toString());

                              child.on('close', code => {
                                        resolve({ code, stdout, stderr });
                              });
                    } catch (err) {
                              reject(err.message);
                    }
          });

});
