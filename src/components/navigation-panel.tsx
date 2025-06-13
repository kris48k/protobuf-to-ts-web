import { Checkbox } from "./ui/checkbox";

export function NavigationPanel() {
  return (
    <div className="width-full">
      <div className="flex items-center space-x-2">
        <Checkbox id="typescript" />
        <label
          htmlFor="typescript"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Typescript
        </label>
      </div>
    </div>
  );
}
