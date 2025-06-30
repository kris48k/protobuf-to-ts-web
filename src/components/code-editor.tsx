import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-protobuf";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-github";

export interface CodeEditorProps {
  language: "protobuf" | "typescript";
  value: string;
  onChange: (val: string) => void;
  theme: "dark" | "light";
  id: string;
}

export function CodeEditor({
  language,
  value,
  onChange,
  theme,
  id,
}: CodeEditorProps) {
  return (
    <AceEditor
      mode={language}
      theme={theme === "dark" ? "monokai" : "github"}
      onChange={onChange}
      name={id}
      editorProps={{ $blockScrolling: true }}
      className="w-full h-full"
      value={value}
    />
  );
}
