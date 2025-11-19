// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Editor from "@monaco-editor/react";
export interface CodeEditorProp {
  language: "html" | "js" | "css";
}
export const CodeEditor = ({ language, ...restProps }: CodeEditorProp) => {
  const handleEditorMount = (editor, monaco) => {
    // ============================
    // 1) HTML language enhancement
    // ============================
    monaco.languages.html.htmlDefaults.setOptions({
      suggest: {
        html5: true,
      },
      data: {
        useDefaultDataProvider: true,
      },
    });

    // ============================
    // 2) Enable CSS in <style>
    // ============================
    monaco.languages.css.cssDefaults.setOptions({
      validate: true,
      lint: {
        compatibleVendorPrefixes: "warning",
        duplicateProperties: "warning",
        emptyRules: "warning",
      },
    });

    // ============================
    // 3) Enable JS in <script>
    // ============================
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      allowJs: true,
      checkJs: false,
    });

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
  };

  return (
    <Editor
      {...restProps}
      height="400px"
      language={language}
      defaultValue={`<div class="box">Hello</div>`}
      onMount={handleEditorMount}
    />
  );
};
