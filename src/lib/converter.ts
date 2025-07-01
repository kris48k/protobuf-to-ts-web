import type { ISettings } from "@/store/codeStore";

export default (protoContent: string, settings: ISettings) => {
  try {
    const lines = protoContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);
    let typescript =
      "// Generated TypeScript interfaces from Protocol Buffer\n\n";

    let currentMessage = null;
    let currentEnum = null;
    let indentLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (
        line.startsWith("//") ||
        line.startsWith("syntax") ||
        line.startsWith("package") ||
        line.startsWith("import")
      ) {
        continue;
      }

      if (line.startsWith("message ")) {
        const messageName = line.match(/message\s+(\w+)/)?.[1];
        if (messageName) {
          currentMessage = messageName;
          typescript += `export interface ${messageName} {\n`;
          indentLevel = 1;
        }
      } else if (line.startsWith("enum ")) {
        const enumName = line.match(/enum\s+(\w+)/)?.[1];
        if (enumName) {
          currentEnum = enumName;
          if (!settings.enumAsUnion) {
            typescript += `export enum ${enumName} {\n`;
          } else {
            typescript += `export type ${enumName} = `;
          }
          indentLevel = 1;
        }
      } else if (line === "}") {
        if (currentEnum && settings.enumAsUnion) {
          typescript = typescript.slice(0, -1);
          typescript += "; \n\n";
        } else {
          indentLevel = 0;
          typescript += "}\n\n";
          currentMessage = null;
        }
        currentEnum = null;
      } else if (currentMessage && line.includes("=")) {
        const fieldMatch = line.match(/(\w+)\s+(\w+)\s*=\s*(\d+);?/);
        if (fieldMatch) {
          const [, type, name] = fieldMatch;
          const tsType = convertProtobufTypeToTS(type as keyof typeof TYPE_MAP);
          const indent = "  ".repeat(indentLevel);

          const isRepeated = line.includes("repeated ");
          const finalType = isRepeated ? `${tsType}[]` : tsType;

          const isOptional =
            line.includes("optional ") || !line.includes("required ");
          const optionalMarker = isOptional ? "?" : "";

          typescript += `${indent}${name}${optionalMarker}: ${finalType};\n`;
        }
      } else if (currentEnum && line.includes("=")) {
        const enumMatch = line.match(/(\w+)\s*=\s*(\d+);?/);

        if (enumMatch) {
          const [, name, value] = enumMatch;
          if (!settings.enumAsUnion) {
            const indent = "  ".repeat(indentLevel);
            typescript += `${indent}${name} = ${value},\n`;
          } else {
            typescript += ` "${name}" |`;
          }
        }
      }
    }

    return typescript;
  } catch (err: unknown) {
    throw new Error(`Parsing error: ${(err as Error).message}`);
  }
};

const TYPE_MAP = {
  int32: "number",
  int64: "number",
  uint32: "number",
  uint64: "number",
  sint32: "number",
  sint64: "number",
  fixed32: "number",
  fixed64: "number",
  sfixed32: "number",
  sfixed64: "number",
  float: "number",
  double: "number",
  bool: "boolean",
  string: "string",
  bytes: "Uint8Array",
} as const;

// Convert protobuf types to TypeScript types
const convertProtobufTypeToTS = (pbType: keyof typeof TYPE_MAP) => {
  return TYPE_MAP[pbType] || pbType;
};
