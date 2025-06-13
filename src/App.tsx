import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { NavigationPanel } from "./components/navigation-panel";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-protobuf";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

function App() {
  function onChange(newValue: string) {
    console.log("change", newValue);
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1>Online Proto Contract to TS Converter</h1>
      <div className="absolute top-1 right-1">
        <ModeToggle />
      </div>

      <div className="code-container">
        <NavigationPanel />
        <div className="code-block flex gap-1 width-full height-80vh">
          <Card className="flex-1 pb-0">
            <CardHeader>Protobuf contract</CardHeader>
            <CardContent className="proto-panel code-panel border-1 w-full p-0 h-full position relative">
              <AceEditor
                mode="protobuf"
                theme="github"
                onChange={onChange}
                name="proto-editor"
                editorProps={{ $blockScrolling: true }}
                className="w-full h-full"
              />
              ,
            </CardContent>
          </Card>
          <Card className="flex-1 pb-0">
            <CardHeader>Typescript</CardHeader>
            <CardContent className="ts-panel code-panel border-1 w-full"></CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
