import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import { convertType } from "../utils";

export const abis: {
  [name: string]: {
    [action: string]: {
      [type: string]: "String" | "Int";
    };
  };
} = {};

// Load all abi
glob.sync(path.join(__dirname, "*.abi")).forEach((filepath) => {
  const abiName = path.parse(filepath).name;
  const abi = JSON.parse(fs.readFileSync(filepath, "utf8"));
  const actions: any = {};
  const types: any = {};
  const structs: any = {};

  // Types
  for (const type of abi.types) {
    types[type.new_type_name] = convertType(type.type);
  }

  // Structs
  for (const struct of abi.structs) {
    const structFields: any = {};
    for (const field of struct.fields) {
      structFields[field.name] = convertType(field.type);
    }
    structs[struct.name] = structFields;
  }

  for (const action of abi.actions) {
    actions[action.name] = structs[action.type];
  }
  abis[abiName] = actions;
});
