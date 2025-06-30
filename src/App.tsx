import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { NavigationPanel } from "./components/navigation-panel";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { CodeEditor } from "./components/code-editor";

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

function App() {
  function onProtoChange(newValue: string) {
    console.log("changeProto", newValue);
  }

  function onTsChange(newValue: string) {
    console.log("changeTs", newValue);
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1>Online Protobuf Contract to TS Converter</h1>
      <div className="absolute top-1 right-1">
        <ModeToggle />
      </div>

      <div className="code-container">
        <NavigationPanel />
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
      </div>
    </ThemeProvider>
  );
}

export default App;
