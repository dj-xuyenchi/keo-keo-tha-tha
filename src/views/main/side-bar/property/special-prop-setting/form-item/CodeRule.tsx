import { CodeEditor } from "@/component/project-component/CodeEditor";

export const CodeRule = ({ codeContent }: { codeContent: string }) => {
  return (
    <>
      <div
        style={{
          height: "400px",
        }}
      >
        <CodeEditor language="javascript" codeContent={codeContent} />
      </div>
    </>
  );
};
