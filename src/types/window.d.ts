export {};

declare global {
  interface Window {
    electronAPI: {
      readFile: (fileName: string) => Promise<string>;
      writeFile: (
        fileName: string,
        content: string
      ) => Promise<boolean | string>;
    };
  }
}
