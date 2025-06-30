import { CodeEditor } from "./code-editor";
import { Card, CardHeader, CardContent } from "./ui/card";
import "./code-convertor.css";

const protoValue = `syntax = "proto3";

message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 results_per_page = 3;
}
`;

const tsValue = `export interface SearchRequest {
  query: string;
  page_number: number;
  results_per_page: number;
}`;

export function CodeConvertor() {
  function onProtoChange(newValue: string) {
    console.log("changeProto", newValue);
  }

  function onTsChange(newValue: string) {
    console.log("changeTs", newValue);
  }

  return (
    <div className="code-block flex gap-1 width-full height-80vh">
      <Card className="flex-1 pb-0">
        <CardHeader>Protobuf contract</CardHeader>
        <CardContent className="proto-panel code-panel border-1 w-full p-0 h-full position relative">
          <CodeEditor
            language="protobuf"
            onChange={onProtoChange}
            id="proto-editor"
            value={protoValue}
            theme="dark"
          />
        </CardContent>
      </Card>
      <Card className="flex-1 pb-0">
        <CardHeader>Typescript</CardHeader>
        <CardContent className="ts-panel code-panel border-1 w-full p-0 h-full position relative">
          <CodeEditor
            language="typescript"
            onChange={onTsChange}
            id="ts-editor"
            value={tsValue}
            theme="dark"
          />
        </CardContent>
      </Card>
    </div>
  );
}
