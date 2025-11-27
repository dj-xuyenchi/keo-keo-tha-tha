export {};

declare global {
  interface Window {
    electronAPI: {
      deleteFile(fileKey: string): boolean;
      createFile(fileKeyName: string, initContent: string): boolean;
      listFiles(folder: string): [{ name: string; size: number }];
      readFile: (fileName: string) => Promise<string>;
      writeFile: (
        fileName: string,
        content: string
      ) => Promise<boolean | string>;
      onShowExitConfirm: (callback) => boolean;
      confirmExit: () => boolean;
    };
    __REDUX_STORE__?: ReturnType<typeof createStore>;
  }
}
