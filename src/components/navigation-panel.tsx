import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { useStore } from "@tanstack/react-store";
import { codeStore as store, type ISettings } from "../store/codeStore";
import type { CheckedState } from "@radix-ui/react-checkbox";

export function NavigationPanel() {
  const settings = useStore(store, (state) => state.settings);

  const updateSettings = (newSettings: ISettings) => {
    store.setState((state) => {
      return {
        ...state,
        settings: newSettings,
      };
    });
  };

  const onEnumAsUnionChanged = (checked: CheckedState) => {
    updateSettings({
      ...settings,
      enumAsUnion: checked === "indeterminate" ? false : checked,
    });
  };

  return (
    <div className="width-full">
      <div className="flex items-center space-x-2">
        <Checkbox id="enums_as_union" onCheckedChange={onEnumAsUnionChanged} />
        <label
          htmlFor="enums_as_union"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Enums as union type
        </label>
        <Separator orientation="vertical" />
      </div>
    </div>
  );
}
