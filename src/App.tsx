import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { NavigationPanel } from "./components/navigation-panel";
import { CodeConvertor } from "./components/code-convertor";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1>Online Protobuf Contract to TS Converter</h1>
      <div className="absolute top-1 right-1">
        <ModeToggle />
      </div>

      <div className="code-container">
        <NavigationPanel />
        <CodeConvertor />
      </div>
    </ThemeProvider>
  );
}

export default App;
