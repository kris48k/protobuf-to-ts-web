import { CodeEditor } from "./code-editor";
import { Card, CardHeader, CardContent } from "./ui/card";
import { store } from "../store";

import "./code-convertor.css";
import { useStore } from "@tanstack/react-store";

export function CodeConvertor() {
  function onProtoChange(newValue: string) {
    updateProto(newValue);
  }

  function onTsChange(newValue: string) {
    console.log("changeTs", newValue);
  }

  const protoCode = useStore(store, (state) => state.proto);
  const tsCode = useStore(store, (state) => state.ts);

  const updateProto = (newProtoCode: string) => {
    store.setState((state) => {
      return {
        ...state,
        proto: newProtoCode,
      };
    });
  };

  return (
    <div className="code-block flex gap-1 width-full height-80vh">
      <Card className="flex-1 pb-0">
        <CardHeader>Protobuf contract</CardHeader>
        <CardContent className="proto-panel code-panel border-1 w-full p-0 h-full position relative">
          <CodeEditor
            language="protobuf"
            onChange={onProtoChange}
            id="proto-editor"
            value={protoCode}
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
            value={tsCode}
            theme="dark"
          />
        </CardContent>
      </Card>
    </div>
  );
}
