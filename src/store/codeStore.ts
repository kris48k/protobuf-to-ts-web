import { Store } from "@tanstack/react-store";
import converter from "../lib/converter";

export interface ISettings {
  enumAsUnion?: boolean;
}

export interface IState {
  proto: string;
  ts: string;
  settings: ISettings;
}

const initialProto = `syntax = "proto3";

message User {
  required int32 id = 1;
  string name = 2;
  string email = 3;
  repeated string tags = 4;
  optional Address address = 5;
  Status status = 6;
}

message Address {
  string street = 1;
  string city = 2;
  string country = 3;
  int32 postal_code = 4;
}

enum Status {
  UNKNOWN = 0;
  ACTIVE = 1;
  INACTIVE = 2;
  PENDING = 3;
}`;

export const codeStore = new Store<IState>(
  {
    proto: initialProto,
    ts: converter(initialProto, {}),
    settings: {
      enumAsUnion: false,
    },
  },
  {
    updateFn: (prevValue: IState) => (updateValue) => {
      const newValue = updateValue(prevValue);
      newValue.ts = converter(newValue.proto, newValue.settings);
      return newValue;
    },
  }
);
