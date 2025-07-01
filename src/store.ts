import { Store } from "@tanstack/react-store";
import converter from "./lib/converter";

export interface IState {
  theme: "dark" | "light";
  proto: string;
  ts: string;
}

const initialProto = `syntax = "proto3";

message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  repeated string tags = 4;
  optional Address address = 5;
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

const initialTs = `export interface User {
  id?: number;
  name?: string;
  email?: string;
  tags?: string[];
  address?: Address;
}

export interface Address {
  street?: string;
  city?: string;
  country?: string;
  postal_code?: number;
}

export enum Status {
  UNKNOWN = 0,
  ACTIVE = 1,
  INACTIVE = 2,
  PENDING = 3,
}
`;

export const store = new Store<IState>(
  {
    theme: "dark",
    proto: initialProto,
    ts: initialTs,
  },
  {
    updateFn: (prevValue: IState) => (updateValue) => {
      const newValue = updateValue(prevValue);
      newValue.ts = converter(newValue.proto);
      return newValue;
    },
  }
);
